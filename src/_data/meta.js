export const url = process.env.URL || 'http://localhost:8080';
export const siteName = '11ty-Starter';
export const siteDescription = 'A custom starter kit for 11ty website projects';
export const siteType = 'Person';
export const locale = 'fr_FR';
export const lang = 'fr';
export const creator = {
    name: 'Julien Folliot', // i.e. Lene Saile - creator's (developer) name.
    email: 'hello@julien-folliot.fr',
    website: 'https://www.julien-folliot.fr',
    social: 'https://www.linkedin.com/in/julien-folliot-dev/'
};
export const designer = {
    name: 'Julie Vuillaume', // i.e. Lene Saile - creator's (developer) name.
    email: 'hello@julie-vuillaume.fr',
    website: 'https://www.julie-vuillaume.fr',
    social: 'https://www.linkedin.com/in/julie-vuillaume44000/'
};
export const pathToSvgLogo = 'src/assets/svg/misc/logo.svg'; // used for favicon generation
export const themeColor = '#DD4462'; //  Manifest: defines the default theme color for the application
export const themeBgColor = '#FBFBFB'; // Manifest: defines a placeholder background color for the application page to display before its stylesheet is loaded
export const opengraph_default = '/assets/images/template/opengraph-default.jpg'; // fallback/default meta image
export const opengraph_default_alt = siteDescription; // alt text for default meta image"