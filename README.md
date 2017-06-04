![Front End at Grab Banner](images/front-end-at-grab-banner.png)

Grab Front End Guide
==

[Grab](https://www.grab.com) is Southeast Asia (SEA)'s leading transportation platform and our mission is to drive SEA forward, leveraging on the latest technology and the talented people we have in the company. As of May 2017, we handle [2.3 million rides daily](https://www.bloomberg.com/news/videos/2017-05-11/tans-says-company-has-more-than-850-000-drivers-video) and we are growing and hiring at a rapid scale.

To keep up with Grab's phenomenal growth, our web team and web platforms have to grow as well. Fortunately, or unfortunately, at Grab, the web team has been [keeping up](https://blog.daftcode.pl/hype-driven-development-3469fc2e9b22) with the latest best practices and has incorporated the modern JavaScript ecosystem in our web apps.

The result of this is that our new hires or back end engineers, who are not necessarily well-acquainted with the modern JavaScript ecosystem, may feel overwhelmed by the barrage of new things that they have to learn just to complete their feature or bug fix in a web app. Front end development has never been so complex and exciting as it is today. New tools, libraries, frameworks and plugins emerge every other day and there is so much to learn. It is imperative that newcomers to the web team are guided to embrace this evolution of the front end, learn to navigate the ecosystem with ease, and get productive in shipping code to our users as fast as possible. We have come up with a study guide to introduce why we do what we do, and how we handle front end at scale.

This study guide is inspired by ["A Study Plan to Cure JavaScript Fatigue"](https://medium.freecodecamp.com/a-study-plan-to-cure-javascript-fatigue-8ad3a54f2eb1#.g9egaapps) and is mildly opinionated in the sense that we recommend certain libraries/frameworks to learn for each aspect of front end development, based on what is currently deemed most suitable at Grab. We explain why a certain library/framework/tool is chosen and provide links to learning resources to enable the reader to pick it up on their own. Alternative choices that may be better for other use cases are provided as well for reference and further self-exploration.

If your company is exploring a modern JavaScript stack as well, you may find this study plan useful to your company too! Feel free to adapt it to your needs. We will update this study plan periodically, according to our latest work and choices.

*- Grab Web Team*

**Pre-requisites**

- Good understanding of core programming concepts.
- Comfortable with basic command line actions and familiarity with source code version control systems such as Git.
- Experience in web development. Have built server-side rendered web apps using frameworks like Ruby on Rails, Django, Express, etc.
- Understanding of how the web works. Familiarity with web protocols and conventions like HTTP and RESTful APIs.

### Table of Contents

- [Single-page Apps (SPAs)](#single-page-apps-spas)
- [New-age JavaScript](#new-age-javascript)
- [User Interface](#user-interface---react)
- [State Management](#state-management---fluxredux)
- [Coding with Style](#coding-with-style---css-modules)
- [Maintainability](#maintainability)
  - [Testing](#testing---jest--enzyme)
  - [Linting JavaScript](#linting-javascript---eslint)
  - [Linting CSS](#linting-css---stylelint)
  - [Types](#types---flow)
- [Build System](#build-system---webpack)
- [Package Management](#package-management---yarn)

Certain topics can be skipped if you have prior experience in them.

### Single-page Apps (SPAs)

Web developers these days refer to the products they build as web apps, rather than websites. While there is no strict difference between the two terms, web apps tend to be highly interactive and dynamic, allowing the user to perform actions and receive a response for their action. Traditionally, the browser receives HTML from the server and renders it. When the user navigates to another URL, a full-page refresh is required and the server sends fresh new HTML for the new page. This is called server-side rendering.

However in modern SPAs, client-side rendering is used instead. The browser loads the initial page from the server, along with the scripts (frameworks, libraries, app code) and stylesheets required for the whole app. When the user navigates to other pages, a page refresh is not triggered. The URL of the page is updated via the [HTML5 History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API). New data required for the new page, usually in JSON format, is retrieved by the browser via [AJAX](https://developer.mozilla.org/en-US/docs/AJAX/Getting_Started) requests to the server. The SPA then dynamically updates the page with the data via JavaScript, which it has already downloaded in the initial page load. This model is similar to how native mobile apps work.

The benefits:

- The app feels more responsive and users do not see the flash between page navigations due to full-page refreshes.
- Fewer HTTP requests are needed to the server, as the same assets do not have to be downloaded again for each page load.
- Clear separation of the concerns between the client and the server; you can easily build new clients for different platforms (e.g. mobile, chatbots, smart watches) without having to modify the server code. You can also modify the technology stack on the client and server independently, as long as the API contract is not broken.

The downsides:

- Heavier initial page load due to loading of framework, app code, and assets required for multiple pages [^1].
- There's an additional step to be done on your server which is to configure it to route all requests to a single entry point and allow client-side routing to take over from there.
- SPAs are reliant on JavaScript to render content, but not all search engines execute JavaScript during crawling, and they may see empty content on your page. This inadvertently hurts the SEO of your app [^2].

While traditional server-side rendered apps are still a viable option, a clear client-server separation scales better for larger engineering teams, as the client and server code can be developed and released independently. This is especially so at Grab when we have multiple client apps hitting the same API server.

As web developers are now building apps rather than pages, organization of client-side JavaScript has become increasingly important. In server-side rendered pages, it is common to use snippets of jQuery to add user interactivity to each page. However, when building large apps, jQuery is not sufficient. After all, jQuery is primarily a library for DOM manipulation and it's not a framework, it does not define a clear structure and organization for your app.

JavaScript frameworks have been created to provide higher-level abstractions over the DOM, allowing you to keep state in memory, out of the DOM. Using frameworks also brings the benefits of reusing recommended concepts and best practices for building apps. A new engineer on the team who has experience with a framework but not the app will find it easier to understand the code because it is organized in a structure that he is familiar with. Popular frameworks have a lot of tutorials and guides, and tapping on the knowledge and experience from colleagues and the community will help new engineers get up to speed.

#### Study Links

- [Single Page App: advantages and disadvantages](http://stackoverflow.com/questions/21862054/single-page-app-advantages-and-disadvantages)
- [The (R)Evolution of Web Development](http://blog.isquaredsoftware.com/presentations/2016-10-revolution-of-web-dev/)

### New-age JavaScript

Before you dive into the various aspects of building a JavaScript web app, it is important to get familiar with the language of the web - JavaScript, or ECMAScript. JavaScript is an incredibly versatile language which you can also use to build [web servers](https://nodejs.org/en/), [native mobile apps](https://facebook.github.io/react-native/) and [desktop apps](https://electron.atom.io/).

Prior to 2015, the last major update was ECMAScript 5.1, in 2011. However, in the recent years, JavaScript has suddenly seen a huge burst of improvements within a short span of time. In 2015, ECMAScript 2015 (previously called ECMAScript 6) was released and a ton of syntactic constructs were introduced to make writing code less unwieldy. Auth0 has written a [nice history of JavaScript](https://auth0.com/blog/a-brief-history-of-javascript/). Till this day, not all browsers have fully implemented the ES2015 specification. Tools such as [Babel](https://babeljs.io/) enable developers to write ES2015 in their apps and Babel transpiles them down to ES5 to be compatible for browsers.

Being familiar with both ES5 and ES2015 is crucial. ES2015 is still relatively new and a lot of open source code and Node.js apps are still written in ES5. If you are doing debugging in your browser console, you might not be able to use ES2015 syntax. On the other hand, documentation and example code for many modern libraries that we will introduce later below are written in ES2015. At Grab, we use ES2015 (with [Babel Stage-0 preset](https://babeljs.io/docs/plugins/preset-stage-0/)) to embrace the syntactic improvements the future of JavaScript provides and we have been loving it so far.

Spend a day or two revising ES5 and exploring ES2015. The more heavily used features in ES2015 include "Arrows and Lexical This", "Classes", "Template Strings", "Destructuring", "Default/Rest/Spread operators", and "Importing and Exporting modules".

**Estimated Duration: 3-4 days.** You can learn/lookup the syntax as you learn the other libraries and try building your own app.

#### Study Links

- [Learn ES5 on Codecademy](https://www.codecademy.com/learn/learn-javascript)
- [Learn ES2015 on Babel](https://babeljs.io/learn-es2015/)
- [ES6 Katas](http://es6katas.org/)

### User Interface - React

<img alt="React Logo" src="https://cdn.rawgit.com/grab/front-end-guide/master/images/react-logo.svg" width="256px" />

If any JavaScript project has taken the front end ecosystem by storm in recent years, that would be [React](https://facebook.github.io/react/). React is a library built and open-sourced by the smart people at Facebook. In React, developers write components for their web interface and compose them together.

React brings about many radical ideas and encourages developers to [rethink best practices](https://www.youtube.com/watch?v=DgVS-zXgMTk). For many years, web developers were taught that it was a good practice to write HTML, JavaScript and CSS separately. React does the exact opposite, and encourages that you write your HTML and [CSS in your JavaScript](https://speakerdeck.com/vjeux/react-css-in-js) instead. This sounds like a crazy idea at first, but after trying it out, it actually isn't as weird as it sounds initially. Reason being the front end development scene is shifting towards a paradigm of component-based development. The features of React:

- **Declarative** - You describe what you want to see in your view and not how to achieve it. In the jQuery days, developers would have to come up with a series of steps to manipulate the DOM to get from one app state to the next. In React, you simply change the state within the component and the view will update itself according to the state. It is also easy to determine how the component will look like just by looking at the markup in the `render()` method.

- **Functional** - The view is a pure function of `props` and `state`. In most cases, a React component is defined by `props` (external parameters) and `state` (internal data). For the same `props` and `state`, the same view is produced. Pure functions are easy to test, and the same goes for functional components. Testing in React is made easy because a component's interfaces are well-defined and you can test the component by supplying different `props` and `state` to it and comparing the rendered output.

- **Maintainable** - Writing your view in a component-based fashion encourages reusability. We find that defining a component's `propTypes` make React code self-documenting as the reader can know clearly what is needed to use that component. Lastly, your view and logic is self-contained within the component, and should not be affected nor affect other components. That makes it easy to shift components around during large-scale refactoring, as long as the same `props` are supplied to the component.

- **High Performance** - You might have heard that React uses a virtual DOM (not to be confused with [shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Shadow_DOM)) and it re-renders everything when there is a change in state. Why is there a need for a virtual DOM? While modern JavaScript engines are fast, reading from and writing to the DOM is slow. React keeps a lightweight virtual representation of the DOM in memory. Re-rendering everything is a misleading term. In React it actually refers to re-rendering the in-memory representation of the DOM, not the actual DOM itself. When there's a change in the underlying data of the component, a new virtual representation is created, and compared against the previous representation. The difference (minimal set of changes required) is then patched to the real browser DOM.

- **Ease of Learning** - Learning React is pretty simple. The React API surface is relatively small compared to [this](https://angular.io/docs/ts/latest/api/); there are only a few APIs to learn and they do not change often. The React community is one of the largest, and along with that comes a vibrant ecosystem of tools, open-sourced UI components, and a ton of great resources online to get you started on learning React.

- **Developer Experience** - There are a number of tools that improves the development experience with React. [React Devtools](https://github.com/facebook/react-devtools) is a browser extension that allows you to inspect your component, view and manipulate its `props` and `state`. [Hot reloading] with webpack allows you to view changes to your code in your browser, without you having to refresh the browser. Front end development involves a lot of tweaking code, saving and then refreshing the browser. Hot reloading helps you by eliminating the last step. When there are library updates, Facebook provides [codemod scripts](https://github.com/reactjs/react-codemod) to help you migrate your code to the new APIs. This makes the upgrading process relatively pain-free. Kudos to the Facebook team for their dedication in making the development experience with React great. <br> ![React Devtools Demo](images/react-devtools-demo.gif)

Over the years, new view libraries that are even more performant than React have emerged. React may not be the fastest library out there, but in terms of the ecosystem, overall usage experience and benefits, it is still one of the greatest. Facebook is also channeling efforts into making React even faster with a [rewrite of the underlying reconciliation algorithm](https://github.com/acdlite/react-fiber-architecture). The concepts that React introduced has taught us how to write better code, more maintainable web apps and made us better engineers. We like that.

We recommend going through the [tutorial](https://facebook.github.io/react/tutorial/tutorial.html) on building a tic-tac-toe game on the React homepage to get a feel of what React is and what it does. For more in-depth learning, check out the free course [React Fundamentals](https://reacttraining.com/online/react-fundamentals) by the creators of React Router. It is highly rated and taught by experts from the React community. It also covers more advanced concepts that are not covered by the React documentation. [Create React App](https://github.com/facebookincubator/create-react-app) by Facebook is a tool to scaffold a React project with minimal configuration and is highly recommended to use for starting new React projects.

React is a library, not a framework, and does not deal with the layers below the view - the app state. More on that later.

**Estimated Duration: 3-4 days.** Try building simple projects like a to-do list, Hacker News clone with pure React. You will slowly gain an appreciation for it and perhaps face some problems along the way that isn't solved by React, which brings us to the next topic...

#### Study Links

- [React Official Tutorial](https://facebook.github.io/react/tutorial/tutorial.html)
- [React Fundamentals](https://reacttraining.com/online/react-fundamentals)
- [Simple React Development in 2017](https://hackernoon.com/simple-react-development-in-2017-113bd563691f)
- [Presentational and Container Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.5iexphyg5)

#### Alternatives

- [Angular](https://angular.io/)
- [Ember](https://www.emberjs.com/)
- [Vue](https://vuejs.org/)
- [Cycle](https://cycle.js.org/)

### State Management - Flux/Redux

<img alt="Redux Logo" src="https://cdn.rawgit.com/grab/front-end-guide/master/images/redux-logo.svg" width="256px" />

As your app grows bigger, you may find that the app structure becomes a little messy. Components throughout the app may have to share and display common data but there is no elegant way to handle that in React. After all, React is just the view layer, it does not dictate how you structure the other layers of your app, such as the model and the controller, in traditional MVC paradigms. In an effort to solve this, Facebook invented Flux, an app architecture that complements React's composable view components by utilizing a unidirectional data flow. Read more about how Flux works [here](https://facebook.github.io/flux/docs/in-depth-overview.html). In summary, the Flux pattern has the following characteristics:

- **Unidirectional data flow** - Makes the app more predictable as updates can be tracked easily.
- **Separation of concerns** - Each part in the Flux architecture has clear responsibilities and are highly decoupled.
- **Works well with declarative programming** - The store can send updates to the view without specifying how to transition views between states.

As Flux is not a framework per se, developers have tried to come up with many implementations of the Flux pattern. Eventually, a clear winner emerged, which was [Redux](http://redux.js.org/). Redux combines the ideas from Flux, [Command pattern](https://www.wikiwand.com/en/Command_pattern) and [Elm architecture](https://guide.elm-lang.org/architecture/) and is the de facto state management library developers use with React these days. Its core concepts are:

- App **state** is described by a single plain old JavaScript object (POJO).
- Dispatch an **action** (also a POJO) to modify the state.
- **Reducer** is a pure function that takes in current state and action to produce a new state.

The concepts sound simple, but they are really powerful as they enable apps to:

- Have their state rendered on the server, booted up on the client.
- Trace, log and backtrack changes in the whole app (made easier with [Redux Devtools](https://github.com/gaearon/redux-devtools))
- Implement undo/redo functionality easily.

The creator of Redux, [Dan Abramov](https://github.com/gaearon), has taken great care in writing up detailed documentation for Redux, along with creating comprehensive video tutorials for learning [basic](https://egghead.io/series/getting-started-with-redux) and [advanced](https://egghead.io/courses/building-react-apps-with-idiomatic-redux) Redux. They are extremely helpful resources for learning Redux.

**Combining View and State**

While Redux does not necessarily have to be used with React, it is highly recommended as they play very well with each other. React and Redux have a lot of ideas and traits in common:

- **Functional composition paradigm** - React composes views (pure functions) while Redux composes pure reducers (also pure functions). Output is predictable given the same set of input.
- **Easy To Reason About** - You may have heard this term many times but what does it actually mean? Through our experience, React and Redux makes debugging simpler. As the data flow is unidirectional, tracing the flow of data (server responses, user input events) is easier and it is straightforward to determine which layer the problem occurs.
- **Layered Structure** - Each layer in the app / Flux architecture is a pure function, and has clear responsibilities. It is pretty easy to write tests for them.
- **Development Experience** - A lot of effort has gone into creating tools to help in debugging and inspecting the app while development, such as [redux-devtools](https://github.com/gaearon/redux-devtools). <br> ![Redux Devtools Demo](images/redux-devtools-demo.gif)

[react-redux](https://github.com/reactjs/react-redux) is an official React binding for Redux and is very simple to learn.

**Estimated Duration: 4 days.** The egghead courses can be a little time consuming but they are worth spending time on. After learning Redux, you can try incorporating it into the React projects you have built. Does Redux solve some of the state management issues you were struggling with in pure React?

#### Study Links

- [Flux Homepage](http://facebook.github.io/flux)
- [Redux Homepage](http://redux.js.org/)
- [Egghead Course - Getting Started with Redux](https://egghead.io/courses/getting-started-with-redux)
- [Egghead Course - Build React Apps with Idiomatic Redux](https://egghead.io/courses/building-react-apps-with-idiomatic-redux)
- [React Redux Links](https://github.com/markerikson/react-redux-links)
- [You Might Not Need Redux](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367)

#### Alternatives

- [MobX](https://github.com/mobxjs/mobx)

### Coding with Style - CSS Modules

<img alt="CSS Modules Logo" src="https://cdn.rawgit.com/grab/front-end-guide/master/images/css-modules-logo.svg" width="256px" />

Writing good CSS is hard. It takes many years of experience and frustration of shooting yourself in the foot before one is able to write maintainable and scalable CSS. CSS, having a global namespace, is fundamentally designed for web documents, and not really for web apps that favor a components architecture. Hence, experienced front end developers have designed methodologies to guide people on how to write organized CSS for complex projects, such as using [SMACSS](https://smacss.com/), [BEM](http://getbem.com/introduction/), [SUIT CSS](http://suitcss.github.io/), etc. However, the encapsulation of styles that these methodologies bring about are artificially enforced by conventions and guidelines. They break the moment developers do not follow them.

Fortunately, the front end ecosystem is saturated with tools, and unsurprisingly, tools have been invented to [partially solve some of the problems](https://speakerdeck.com/vjeux/react-css-in-js) with writing CSS at scale. "At scale" means that many developers are working on the same project and touching the same stylesheets. There is no community-agreed approach on writing [CSS in JS](https://github.com/MicheleBertoli/css-in-js) at the moment, and we are hoping that one day a winner would emerge, just like Redux did, among all the Flux implementations. For now, we are banking on [CSS Modules](https://github.com/css-modules/css-modules). CSS modules is an improvement over existing CSS that aims to fix the problem of global namespace in CSS; it enables you to write styles that are local by default and encapsulated to your component. This feature is achieved via tooling. With CSS modules, large teams can write modular and reusable CSS without fear of conflict or overriding other parts of the app. However, at the end of the day, CSS modules are still being compiled into normal globally-namespaced CSS that browsers recognize, and it is still important to learn raw CSS.

If you are a total beginner to CSS, Codecademy's [HTML & CSS course](https://www.codecademy.com/learn/learn-html-css) will be a good introduction to you. Next, read up on the [Sass preprocessor](http://sass-lang.com/), an extension of the CSS language which adds syntactic improvements and encourages style reusability. Study the CSS methodologies mentioned above, and lastly, CSS modules.

**Estimated Duration: 3-4 days.** Try styling up your app using the SMACSS/BEM approach and/or CSS modules.

#### Study Links

- [Learn HTML & CSS course on Codecademy](https://www.codecademy.com/learn/learn-html-css)
- [SMACSS](https://smacss.com/)
- [BEM](http://getbem.com/introduction/)
- [SUIT CSS](http://suitcss.github.io/)
- [CSS Modules Specification](https://github.com/css-modules/css-modules)
- [Sass Homepage](http://sass-lang.com/)
- [A pattern for writing CSS to scale](http://www.intelligiblebabble.com/a-pattern-for-writing-css-to-scale)

#### Alternatives

- [JSS](https://github.com/cssinjs/jss)
- [Styled Components](https://github.com/styled-components/styled-components)

### Maintainability

Code is read more frequently than it is written. This is especially true at Grab, where the team size is large and we have multiple engineers working across multiple projects. We highly value readability, maintainability and stability of the code and there are a few ways to achieve that: "Extensive testing", "Consistent coding style" and "Typechecking".

### Testing - Jest + Enzyme

<img alt="Jest Logo" src="https://cdn.rawgit.com/grab/front-end-guide/master/images/jest-logo.svg" width="164px" />

[Jest](http://facebook.github.io/jest/) is a testing library by Facebook that aims to make the process of testing pain-free. As with Facebook projects, it provides a great development experience out of the box. Tests can be run in parallel for faster speed and during watch mode, only the tests for the changed files are run. One particular feature we like is "Snapshot Testing". Jest can save the generated output of your React component and Redux state and save it as serialized files, so you wouldn't have to manually come up with the expected output yourself. Jest also comes with built-in mocking, assertion and test coverage. One library to rule them all!

![Jest Demo](images/jest-demo.gif)

React comes with some testing utilities, but [Enzyme](http://airbnb.io/enzyme/) by Airbnb makes it easier to generate, assert, manipulate and traverse your React components' output with a jQuery-like API. It is recommended that Enzyme be used to test React components.

Jest and Enzyme makes writing front end tests fun and easy. It also helps that React components and Redux actions/reducers are relatively easy to test because of clearly defined responsibilities and interfaces. For React components, we can test that given some `props`, the desired DOM is rendered, and that callbacks are fired upon certain simulated user interactions. For Redux reducers, we can test that given a prior state and an action, a resulting state is produced.

The documentation for Jest and Enzyme are pretty concise, and it should be sufficient to learn them by reading it.

**Estimated Duration: 2-3 days.** Try writing Jest + Enzyme tests for your React + Redux app!

#### Study Links

- [Jest Homepage](http://facebook.github.io/jest/)
- [Testing React Apps with Jest](https://auth0.com/blog/testing-react-apps-with-jest/)
- [Enzyme Homepage](http://airbnb.io/enzyme/)
- [Enzyme: JavaScript Testing utilities for React](https://medium.com/airbnb-engineering/enzyme-javascript-testing-utilities-for-react-a417e5e5090f)

#### Alternatives

- [AVA](https://github.com/avajs/ava)
- [Karma](https://karma-runner.github.io/)

### Linting JavaScript - ESLint

<img alt="ESLint Logo" src="https://cdn.rawgit.com/grab/front-end-guide/master/images/eslint-logo.svg" width="256px" />

A linter is a tool to statically analyze code and finds problems with them, potentially preventing bugs/runtime errors and at the same time, enforcing a coding style. Time is saved during pull request reviews when reviewers do not have to leave nitpicky comments on coding style. [ESLint](http://eslint.org/) is a tool for linting JavaScript code that is highly extensible and customizable. Teams can write their own lint rules to enforce their custom styles. At Grab, we use Airbnb's [`eslint-config-airbnb`](https://www.npmjs.com/package/eslint-config-airbnb) preset, that has already been configured with the common good coding style in the [Airbnb JavaScript style guide](https://github.com/airbnb/javascript).

For the most part, using ESLint is as simple as tweaking a configuration file in your project folder. There's nothing much to learn about ESLint if you're not writing new rules for it. Just be aware of the errors when they surface and Google it to find out the recommended style.

**Estimated Duration: 1/2 day.** Nothing much to learn here. Add ESLint to your project and fix the linting errors!

#### Study Links

- [ESLint Homepage](http://eslint.org/)
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)

#### Alternatives

- [Standard](https://github.com/feross/standard)
- [JSHint](http://jshint.com/)

### Linting CSS - stylelint

<img alt="stylelint Logo" src="https://cdn.rawgit.com/grab/front-end-guide/master/images/stylelint-logo.svg" width="256px" />

As mentioned earlier, good CSS is notoriously hard to write. Usage of static analysis tools on CSS can help to maintain our CSS code quality and coding style. For linting CSS, we use stylelint. Like ESLint, stylelint is designed in a very modular fashion, allowing developers to turn rules on/off and write custom plugins for it. Besides CSS, stylelint is able to parse SCSS and has experimental support for Less, which lowers the barrier for most existing code bases to adopt it.

![stylelint Demo](images/stylelint-demo.png)

Once you have learnt ESLint, learning stylelint would be effortless considering their similarities. stylelint is currently being used by big companies like [Facebook](https://code.facebook.com/posts/879890885467584/improving-css-quality-at-facebook-and-beyond/), [Github](https://github.com/primer/stylelint-config-primer) and [Wordpress](https://github.com/WordPress-Coding-Standards/stylelint-config-wordpress).

One downside of stylelint is that the autofix feature is not fully mature yet, and is only able to fix for a limited number of rules. However, this issue should improve with time.

**Estimated Duration: 1/2 day.** Nothing much to learn here. Add stylelint to your project and fix the linting errors!

#### Study Links

- [stylelint Homepage](https://stylelint.io/)
- [Lint your CSS with stylelint](https://css-tricks.com/stylelint/)

#### Alternatives

- [Sass Lint](https://github.com/sasstools/sass-lint)
- [CSS Lint](http://csslint.net/)

### Types - Flow

<img alt="Flow Logo" src="https://cdn.rawgit.com/grab/front-end-guide/master/images/flow-logo.png" width="256px" />

Static typing brings about many benefits when writing apps. They can catch common bugs and errors in your code early. Types also serve as a form of documentation for your code and improves the readability of your code. As a code base grows larger, we see the importance of types as they gives us greater confidence when we do refactoring. It is also easier to onboard new members of the team to the project when it is clear what kind of values each object holds and what each function expects.

Adding types to your code comes with the trade-off of increased verbosity and a learning curve of the syntax. But this learning cost is paid upfront and amortized over time. In complex projects where the maintainability of the code matters and the people working on it change over time, adding types to the code brings about more benefits than disadvantages.

The two biggest contenders in adding static types to JavaScript are [Flow](https://flow.org/) (by Facebook) and [TypeScript](https://www.typescriptlang.org/) (by Microsoft). As of date, there is no clear winner in the battle. For now, we have made the choice of using Flow. We find that Flow has a lower learning curve as compared to TypeScript and it requires relatively less effort to migrate an existing code base to Flow. Being built by Facebook, Flow has better integration with the React ecosystem out of the box. Anyway, it is not extremely difficult to move from Flow to TypeScript as the syntax and semantics are quite similar, and we will re-evaluate the situation in time to come. After all, using one is better than not using any at all.

Flow recently revamped their documentation site and it's pretty neat now!

**Estimated Duration: 1 day.** Flow is pretty simple to learn as the type annotations feel like a natural extension of the JavaScript language. Add Flow annotations to your project and embrace the power of type systems.

#### Study Links

- [Flow Homepage](https://flow.org/)
- [TypeScript vs Flow](https://github.com/niieani/typescript-vs-flowtype)

#### Alternatives

- [TypeScript](https://www.typescriptlang.org/)

### Build System - webpack

<img alt="webpack Logo" src="https://cdn.rawgit.com/grab/front-end-guide/master/images/webpack-logo.svg" width="256px" />

This part will be kept short as setting up webpack can be a tedious process and might be a turn-off to developers who are already overwhelmed by the barrage of new things they have to learn for front end development. In a nutshell, [webpack](https://webpack.js.org/) is a module bundler that compiles a front end project and its dependencies into a final bundle to be served to users. Usually, projects will already have the webpack configuration set up and developers rarely have to change it. Having an understanding of webpack is still a good to have in the long run. It is due to webpack that features like hot reloading and CSS modules are made possible.

We have found the [webpack walkthrough](https://survivejs.com/webpack/foreword/) by SurviveJS to be the best resource on learning webpack. It is a good complement to the official documentation and we recommend following the walkthrough first and referring to the documentation later when the need for further customization arises.

**Estimated Duration: 2 days (Optional).**

#### Study Links

- [webpack Homepage](https://webpack.js.org/)
- [SurviveJS - Webpack: From apprentice to master](https://survivejs.com/webpack/foreword/)

#### Alternatives

- [Rollup](https://rollupjs.org/)
- [Browserify](http://browserify.org/)

### Package Management - Yarn

<img alt="Yarn Logo" src="https://cdn.rawgit.com/grab/front-end-guide/master/images/yarn-logo.png" width="256px" />

If you take a peek into your `node_modules` directory, you will be appalled by the number of directories that are contained in it. Each babel plugin, lodash function, is a package on its own. When you have multiple projects, these packages are duplicated across each project and they are largely similar. Each time you run `npm install` in a new project, these packages are downloaded over and over again even though they already exist in some other project in your computer.

There was also the problem of non-determinism in the installed packages via `npm install`. Some of our CI builds fail because at the point of time when the CI server installs the dependencies, it pulled in minor updates to some packages that contained breaking changes. This would not have happened if library authors respected [semver](http://semver.org/) and engineers assumed that API contracts are respected all the time.

[Yarn](https://yarnpkg.com/) solves these problems. The issue of non-determinism of installed packages via a `yarn.lock` file and it ensures that every install results in the exact same file structure in `node_modules` across all machines. Yarn utilizes a global cache directory within your machine, and packages that have been downloaded before do not have to be downloaded again. This also enables offline installation of dependencies!

The most common Yarn commands can be found [here](https://yarnpkg.com/en/docs/usage). Most other yarn commands are similar to the `npm` equivalents and it is fine to use the `npm` versions instead. One of our favorite commands is `yarn upgrade-interactive` which makes updating dependencies a breeze especially when the modern JavaScript project requires so many dependencies these days. Do check it out!

npm@5.0.0 was [released in May 2017](https://github.com/npm/npm/releases/tag/v5.0.0) and it seems to address many of the issues that Yarn aims to solve. Do keep an eye on it!

**Estimated Duration: 2 hours.**

#### Study Links

- [Yarn Homepage](https://yarnpkg.com/)
- [Yarn: A new package manager for JavaScript](https://code.facebook.com/posts/1840075619545360)

#### Alternatives

- [Good old npm](https://github.com/npm/npm/releases/tag/v5.0.0)

### The Journey has Just Begun

Congratulations on making it this far! Front end development today is [hard](https://hackernoon.com/how-it-feels-to-learn-javascript-in-2016-d3a717dd577f), but it is also more interesting than before. What we have covered so far will help any new engineer to Grab's web team to get up to speed with our technologies pretty quickly. There are many more things to be learnt, but building up a solid foundation in the essentials will aid in learning the rest of the technologies. This helpful [front end web developer roadmap](https://github.com/kamranahmedse/developer-roadmap#-front-end-roadmap) shows the alternative technologies available for each aspect.

We made our technical decisions based on what was important to a rapidly growing Grab Engineering team - maintainability and stability of the front end code base. These decisions may or may not apply to smaller teams and projects. Do evaluate what works best for you and your company.

As the front end ecosystem grows, we are actively exploring, experimenting and evaluating how new technologies can make us a more efficient team and improve our productivity. We hope that this post has given you insights into the front end technologies we use at Grab. If what we are doing interests you, [we are hiring](https://grab.careers)!

*Many thanks to [Joel Low](https://github.com/lowjoel), [Li Kai](https://github.com/li-kai) and [Tan Wei Seng](https://github.com/xming13) who reviewed drafts of this article.*

### More Reading

**General**

- [State of the JavaScript Landscape: A Map for Newcomers](http://www.infoq.com/articles/state-of-javascript-2016)
- [The Hitchhiker's guide to the modern front end development workflow](http://marcobotto.com/the-hitchhikers-guide-to-the-modern-front-end-development-workflow/)
- [How it feels to learn JavaScript in 2016](https://hackernoon.com/how-it-feels-to-learn-javascript-in-2016-d3a717dd577f#.tmy8gzgvp)
- [Roadmap to becoming a web developer in 2017](https://github.com/kamranahmedse/developer-roadmap#-frontend-roadmap)
- [Modern JavaScript for Ancient Web Developers](https://trackchanges.postlight.com/modern-javascript-for-ancient-web-developers-58e7cae050f9)

**Other Study Plans**

- [A Study Plan To Cure JavaScript Fatigue](https://medium.freecodecamp.com/a-study-plan-to-cure-javascript-fatigue-8ad3a54f2eb1#.c0wnrrcwd)
- [JS Stack from Scratch](https://github.com/verekia/js-stack-from-scratch)
- [A Beginner’s JavaScript Study Plan](https://medium.freecodecamp.com/a-beginners-javascript-study-plan-27f1d698ea5e#.bgf49xno2)

### Footnotes

[^1]: This can be solved via [webpack code splitting](https://webpack.js.org/guides/code-splitting/).
[^2]: [Universal JS](https://medium.com/@mjackson/universal-javascript-4761051b7ae9) to the rescue!
