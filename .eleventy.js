import dotenv from 'dotenv';
dotenv.config();

import postcss from 'postcss';
import postcssImport from 'postcss-import';
import postcssImportExtGlob from 'postcss-import-ext-glob';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

import Image from "@11ty/eleventy-img";

import path from 'node:path';

import htmlmin from 'html-minifier-terser';

export default async function(eleventyConfig) {

	eleventyConfig.addWatchTarget('./src/assets/**/*.{css,js,svg,png,jpeg,jpg}');

	// CSS 
	eleventyConfig.addBundle('css', {
		hoist: false,
		transforms: [
			async function(content) {
				// type contains the bundle name.
				let { page } = this;
				let result = await postcss([
					postcssImportExtGlob,
					postcssImport,
					autoprefixer,
					cssnano])
					.process(content, { from: page.inputPath, to: null });
				return result.css;
			}
		]
	});

	const stringifyAttributes = attributeMap => {
		return Object.entries(attributeMap)
		  .map(([attribute, value]) => {
			if (typeof value === 'undefined') return '';
			return `${attribute}="${value}"`;
		  })
		  .join(' ');
	  };


	// Images
	eleventyConfig.addShortcode("image", async function(
		src,
		alt = '',
		caption = '',
		loading = 'lazy',
		className,
		sizes = '90vw',
		widths = [440, 650, 960, 1200],
		formats = ['avif', 'webp', 'jpeg']
	  ) {

		let { page } = this;

		const metadata = await Image(src, {
			widths: [...widths],
			formats: [...formats],
			urlPath: '/assets/images/',
			outputDir: './_site/assets/images/',
			filenameFormat: (id, src, width, format, options) => {
			  const extension = path.extname(src);
			  const name = path.basename(src, extension);
			  return `${name}-${width}w.${format}`;
			}
		  });
		
		  const lowsrc = metadata.jpeg[metadata.jpeg.length - 1];
		
		  // Getting the URL to use
		  let imgSrc = src;
		  if (!imgSrc.startsWith('.')) {
			const inputPath = page.inputPath;
			const pathParts = inputPath.split('/');
			pathParts.pop();
			imgSrc = `${pathParts.join('/')}/${src}`;
		  }
		
		  const imageSources = Object.values(metadata)
			.map(imageFormat => {
			  return `  <source type="${imageFormat[0].sourceType}" srcset="${imageFormat
				.map(entry => entry.srcset)
				.join(', ')}" sizes="${sizes}">`;
			})
			.join('\n');
		
		  const imgageAttributes = stringifyAttributes({
			src: lowsrc.url,
			width: lowsrc.width,
			height: lowsrc.height,
			alt,
			loading,
			decoding: loading === 'eager' ? 'sync' : 'async'
		  });
		
		  const imageElement = caption
			? `<figure slot="image" class="flow ${className ? `${className}` : ''}">
						<picture>
							${imageSources}
							<img
							${imgageAttributes}>
						</picture>
						<figcaption>${caption}</figcaption>
					</figure>`
			: `<picture slot="image" class="flow ${className ? `${className}` : ''}">
						${imageSources}
						<img
						${imgageAttributes}>
					</picture>`;
		
		  return htmlmin.minify(imageElement, {collapseWhitespace: true});
	});

};

export const config = {
	markdownTemplateEngine: "njk",
	dir: {
	  input: "src",
	  includes: "_includes",
	  layouts: "_layouts",
	  data: "_data",
	}
  };