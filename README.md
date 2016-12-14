# include-media - Spread plugin
An include-media plugin for spreading css properties over breakpoints

[![NPM](https://nodei.co/npm/include-media-spread.png)](https://nodei.co/npm/include-media-spread/)

[![Build Status](https://travis-ci.org/jackmcpickle/include-media-spread.svg?branch=master)](https://travis-ci.org/jackmcpickle/include-media-spread) [![Dev Dependencies](https://david-dm.org/jackmcpickle/include-media-spread/dev-status.svg)](https://david-dm.org/jackmcpickle/include-media-spread?type=dev&view=list)

## Requirements

* Sass >= 3.4.x
* [include-media](https://github.com/eduardoboucas/include-media)

## Introduction
This plugin calculates the difference between property values and distributes them through your include-media breakpoints.

*Example*
```scss
@import 'include-media';
@import 'include-media-spread';

$breakpoints: (small: 480px, medium: 768px, large: 1024px);

.heading-1 {
  @include spread(font-size, 1rem, 3rem);
}

```

*Generates*
```css

/* Mobile first*/
.heading-1 {
  font-size: 1rem;
}
@media (min-width: 480px) {
  .heading-1 {
    font-size: 1.67rem;
  }
}
@media (min-width: 768px) {
  .heading-1 {
    font-size: 2.33rem;
  }
}
@media (min-width: 1024px) {
  .heading-1 {
    font-size: 3rem;
  }
}
```

### Easing
Spread also allows you to pass a ease argument to accelerate or decelerate through the difference in values

```scss
// ease options - linear (default), in-quad, out-quad, in-cubic, out-cubic, in-quart, out-quart, in-quint, out-quint

.heading-1 {
  // value increases on a curve, accelerating
  @include spread(font-size, 1rem, 3rem, 'in-quad');
}
```

### Multi-value

Allows you to pass top/right/bottom/left values and spread will calculate the difference between the single and multi values.

*Example*

```scss
.module-block {
  @include spread(padding, 15px, 20px 30px 10px);
}
```

*Generates*

```css
.module-block {
  padding: 15px;
}
@media (min-width: 480px) {
  .module-block {
    padding: 16.67px 20px 13.33px 20px;
  }
}
@media (min-width: 768px) {
  .module-block {
    padding: 18.33px 25px 11.67px 25px;
  }
}
@media (min-width: 1024px) {
  .module-block {
    padding: 20px 30px 10px 30px;
  }
}
```


### Custom breakpoints

You can either override globally the breakpoints Include Media Spread will use by default by setting `$ims-breakpoints`. By default it uses the default include-media breakpoints.

*Example*

```scss
$my-breakpoints: (small: 340px, large: 1000px);
$ims-breakpoints: $my-breakpoints;

@import 'include-media-spread';
```

**Or** you to pass custom-breakpoint per mixin.

*Example*

```scss
$custom-breakpoints: (small: 15em, large: 40em);

.module-block {
  @include spread(padding, 10px, 30px, $breakpoints: $custom-breakpoints);
}
```

*Generates*

```css
.module-block {
  padding: 10px;
}
@media (min-width: 15em) {
  .module-block {
    padding: 20px;
  }
}
@media (min-width: 40em) {
  .module-block {
    padding: 30px;
  }
}
```

## Install

* Bower - `bower install include-media-spread`
* Manually - download [this file]() and include in your sass project

## Author

[Jack McNicol](https://twitter.com/jackmcpickle)

*Credit to [Doug Avery](https://twitter.com/averyquery) who a lot of code was borrowed from.*
