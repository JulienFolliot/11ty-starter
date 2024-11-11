---
layout: main/layout
permalink: /index.html
---

## Introduction 

Tout ce qui se trouve dans le markdown est accessible dans les layouts avec la clef ```content```. Il est d'usage d'utiliser le filtre safe ce qui donne, dans un layout en nunjucks : ```{ content | safe }```  

{% image "src/assets/images/test.png", "alt text", "caption text", "eager", "class names", "(min-width:30em) 50vw, 100vw", [1080, 2160] %}