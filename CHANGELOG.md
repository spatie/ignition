# Changelog

All notable changes to `ignition` will be documented in this file

## 1.14.1 - 2024-05-03

### What's Changed

* Bump dependabot/fetch-metadata from 2.0.0 to 2.1.0 by @dependabot in https://github.com/spatie/ignition/pull/623
* Added OpenMage module for Ignition to README by @fballiano in https://github.com/spatie/ignition/pull/628
* Add support for configureable error levels by @rubenvanassche in https://github.com/spatie/ignition/pull/630

### New Contributors

* @fballiano made their first contribution in https://github.com/spatie/ignition/pull/628

**Full Changelog**: https://github.com/spatie/ignition/compare/1.14.0...1.14.1

## 1.14.0 - 2024-04-26

### What's Changed

* Display Livewire 3 data by @riasvdv in https://github.com/spatie/ignition/pull/511

**Full Changelog**: https://github.com/spatie/ignition/compare/1.13.2...1.14.0

## 1.13.2 - 2024-04-16

### What's Changed

* Fix octane by @rubenvanassche in https://github.com/spatie/ignition/pull/606

**Full Changelog**: https://github.com/spatie/ignition/compare/1.13.1...1.13.2

## 1.13.1 - 2024-03-29

### What's Changed

* Change Laravel Context icon
* Bump dependabot/fetch-metadata from 1.6.0 to 2.0.0 by @dependabot in https://github.com/spatie/ignition/pull/581
* Bump ramsey/composer-install from 2 to 3 by @dependabot in https://github.com/spatie/ignition/pull/549

**Full Changelog**: https://github.com/spatie/ignition/compare/1.13.0...1.13.1

## 1.13.0 - 2024-03-28

### What's Changed

* Do not interfere with errors that were suppressed by the @ operator. by @netpalantir in https://github.com/spatie/ignition/pull/388
* Add noopener and noreferrer to external URLs by @RobertBoes in https://github.com/spatie/ignition/pull/435
* Bump actions/cache from 3 to 4 by @dependabot in https://github.com/spatie/ignition/pull/505
* Support Laravel context by @freekmurze in https://github.com/spatie/ignition/pull/586

### New Contributors

* @netpalantir made their first contribution in https://github.com/spatie/ignition/pull/388
* @RobertBoes made their first contribution in https://github.com/spatie/ignition/pull/435

**Full Changelog**: https://github.com/spatie/ignition/compare/1.12.0...1.13.0

## 1.12.0 - 2024-01-03

### What's Changed

* Revert to regular footer
* Bump actions/setup-node from 3 to 4 by @dependabot in https://github.com/spatie/ignition/pull/432

**Full Changelog**: https://github.com/spatie/ignition/compare/1.11.3...1.12.0

## 1.11.3 - 2023-10-18

### What's Changed

- [1.x] Adds support for Symfony 7 and PHP 8.3 by @nunomaduro in https://github.com/spatie/ignition/pull/410
- Bump stefanzweifel/git-auto-commit-action from 4 to 5 by @dependabot in https://github.com/spatie/ignition/pull/409
- Bump actions/checkout from 3 to 4 by @dependabot in https://github.com/spatie/ignition/pull/378
- Mention the Drupal module in the README by @DieterHolvoet in https://github.com/spatie/ignition/pull/303
- Fix unescaped backslashes in JSON produced by GPT by @DieterHolvoet in https://github.com/spatie/ignition/pull/302

### New Contributors

- @DieterHolvoet made their first contribution in https://github.com/spatie/ignition/pull/303

**Full Changelog**: https://github.com/spatie/ignition/compare/1.11.2...1.11.3

## 1.11.2 - 2023-09-19

- Fix missing Tailwind styles

**Full Changelog**: https://github.com/spatie/ignition/compare/1.11.1...1.11.2

## 1.11.1 - 2023-09-19

- Fix: missing Tailwind classes

**Full Changelog**: https://github.com/spatie/ignition/compare/1.11.0...1.11.1

## 1.11.0 - 2023-09-19

- Design tweaks
  
  - Fix gradient on stacktrace
  - Move share dropdown to the right navbar
  - Always open links in new tabs
  
- Add Flare footer
  

**Full Changelog**: https://github.com/spatie/ignition/compare/1.10.1...1.11.0

## 1.10.1 - 2023-08-21

- Fix broken line numbers for paths copied to clipboard
- Fix URL encoding in paths copied to clipboard

## 1.10.0 - 2023-08-21

- Add 'copy to clipboard' support for filepaths and editor URLs
- Bump Ignition UI from 4.6.0 to 4.9.0, includes following changes:
  - Feature: Add 'copy to clipboard' option to editors
  - Fix: Improve detection of vendor frames for JS frames
  - Fix: Navigation for custom contexts not working when context name has whitespaces.
  - Use container queries for responsive components
  - Tweak SQL parameter bindings in the query debug tab
  - Fix: don't listen to keypress events when typing in input fields or textareas
  - Only show context section when relevant
  - Add browser section displaying the user agent
  - Fix request tab not showing up for JS errors
  

## 1.9.0 - 2023-06-28

- Add stack trace arguments support

## 1.8.1 - 2023-06-06

- Bump ignition-ui to 4.5.0, changes:
- Add job section
- Add command section

### What's Changed

- Bump dependabot/fetch-metadata from 1.4.0 to 1.5.1 by @dependabot in https://github.com/spatie/ignition/pull/293

**Full Changelog**: https://github.com/spatie/ignition/compare/1.8.0...1.8.1

## 1.8.0 - 2023-05-25

### What's Changed

- Bump Ignition-UI to 4.4.0 which includes following changes:
  
  - Add support for custom context
  - Add support for exception context
  - Show SQL bindings inline in debug section
  
- Add support for custom context, exception context (and query bindings) by @rubenvanassche in https://github.com/spatie/ignition/pull/286
  
- Add PHPStorm via IDE Remote Control editor link by @raveren in https://github.com/spatie/ignition/pull/262
  
- Fix editor link for Panic's Nova by @knorthfield in https://github.com/spatie/ignition/pull/284
  

### New Contributors

- @rubenvanassche made their first contribution in https://github.com/spatie/ignition/pull/286
- @raveren made their first contribution in https://github.com/spatie/ignition/pull/262
- @knorthfield made their first contribution in https://github.com/spatie/ignition/pull/284

**Full Changelog**: https://github.com/spatie/ignition/compare/1.7.0...1.8.0

## 1.7.0 - 2023-05-04

- improvements to solution rendering

**Full Changelog**: https://github.com/spatie/ignition/compare/1.6.0...1.7.0

## 1.6.0 - 2023-04-27

### What's Changed

- Bump spatie/ignition-ui to 4.2.0. Includes following changes:
  
- - Add indicator for AI-generated solutions
  
- 
- 
- 
- 
- - Add support for rendering markdown in solutions
  
- 
- 
- 
- 
- - Fix vendor frame grouping on Windows
  
- 
- 
- 
- 
- 
- Bump dependabot/fetch-metadata from 1.3.6 to 1.4.0 by @dependabot in https://github.com/spatie/ignition/pull/267
  

**Full Changelog**: https://github.com/spatie/ignition/compare/1.5.0...1.6.0

## 1.5.0 - 2023-04-12

### What's Changed

- Bump stefanzweifel/git-auto-commit-action from 2.3.0 to 4.16.0 by @dependabot in https://github.com/spatie/ignition/pull/237
- Add AI solutions by @freekmurze in https://github.com/spatie/ignition/pull/261

**Full Changelog**: https://github.com/spatie/ignition/compare/1.4.5...1.5.0

## 1.4.5 - 2023-02-28

### What's Changed

- Update Ignition UI to better match Laravel's splash page by @AlexVanderbist in https://github.com/spatie/ignition/pull/238

**Full Changelog**: https://github.com/spatie/ignition/compare/1.4.4...1.4.5

## 1.4.4 - 2023-02-28

### What's Changed

- Bump dependabot/fetch-metadata from 1.3.5 to 1.3.6 by @dependabot in https://github.com/spatie/ignition/pull/227
- fix: use comments to allow proper loading of script by @jaulz in https://github.com/spatie/ignition/pull/184

### New Contributors

- @jaulz made their first contribution in https://github.com/spatie/ignition/pull/184

**Full Changelog**: https://github.com/spatie/ignition/compare/1.4.3...1.4.4

## 1.4.3 - 2023-01-23

- align with Laravel 10

## 1.4.2 - 2023-01-23

- align dependencies with Laravel 10

## 1.4.1 - 2022-08-26

- Revert type change (breaking change) on `SolutionProviderRepository` interface

**Full Changelog**: https://github.com/spatie/ignition/compare/1.4.0...1.4.1

## 1.4.0 - 2022-08-26

### What's Changed

- Improve solution provider repository interface types by @AlexVanderbist in https://github.com/spatie/ignition/pull/160
- More readable for SQL Syntax by @SupianIDz in https://github.com/spatie/ignition/pull/159
- Added VS Codium to the editor options by @WoutervdWaal in https://github.com/spatie/ignition/pull/130
- Fix `${var}` string interpolation deprecation by @Ayesh in https://github.com/spatie/ignition/pull/144
- Fix typos in readme by @krsriq in https://github.com/spatie/ignition/pull/158
- Add ability to add dynamic HTML to head and body tags by @Jubeki in https://github.com/spatie/ignition/pull/161

### New Contributors

- @SupianIDz made their first contribution in https://github.com/spatie/ignition/pull/159
- @WoutervdWaal made their first contribution in https://github.com/spatie/ignition/pull/130
- @Ayesh made their first contribution in https://github.com/spatie/ignition/pull/144
- @krsriq made their first contribution in https://github.com/spatie/ignition/pull/158
- @Jubeki made their first contribution in https://github.com/spatie/ignition/pull/161

**Full Changelog**: https://github.com/spatie/ignition/compare/1.3.1...1.4.0

## 1.3.1 - 2022-05-16

- Bump Ignition UI to v4.0.2
  
- - Fix types: `context.env` can be `null` or `undefined`
  
- 
- 
- 
- 
- 
- 
- 
- 
- 
- 
- 
- 
- 
- JS bundle is no longer compressed to make debugging easier
  

**Full Changelog**: https://github.com/spatie/ignition/compare/1.3.0...1.3.1

## 1.3.0 - 2022-05-12

## What's Changed

- Use Ignition UI v4 by @AlexVanderbist in https://github.com/spatie/ignition/pull/129
  
- - Bump Ignition UI version to 4.0.1
  
- 
- 
- 
- 
- 
- 
- 
- 
- 
- 
- 
- 
- 
- - - Fixed a missing key in Query debug section
    
  
- - 
  
- 
- - 
  
- 
- 
- - 
  
- 
- 
- 
- - 
  
- 
- 
- 
- 
- - 
  
- 
- 
- 
- 
- 
- - 
  
- 
- 
- 
- 
- 
- 
- - 
  
- 
- 
- 
- 
- 
- 
- 
- - 
  
- 
- 
- 
- 
- 
- 
- 
- 
- - 
  
- 
- 
- 
- 
- 
- 
- 
- 
- 
- - 
  
- 
- 
- 
- 
- 
- 
- 
- 
- 
- 
- - 
  
- 
- 
- 
- 
- 
- 
- 
- 
- 
- 
- 
- - 
  
- 
- 
- 
- 
- 
- 
- 
- 
- 
- 
- 
- 
- - 
  
- 
- 
- 
- 
- 
- 
- 
- 
- 
- 
- 
- 
- 
- - - Fixed selecting exceptions without accidentally collapsing the error card
    
  
- - 
  
- 
- - 
  
- 
- 
- - 
  
- 
- 
- 
- - 
  
- 
- 
- 
- 
- - 
  
- 
- 
- 
- 
- 
- - 
  
- 
- 
- 
- 
- 
- 
- - 
  
- 
- 
- 
- 
- 
- 
- 
- - 
  
- 
- 
- 
- 
- 
- 
- 
- 
- - 
  
- 
- 
- 
- 
- 
- 
- 
- 
- 
- - 
  
- 
- 
- 
- 
- 
- 
- 
- 
- 
- 
- - 
  
- 
- 
- 
- 
- 
- 
- 
- 
- 
- 
- 
- - 
  
- 
- 
- 
- 
- 
- 
- 
- 
- 
- 
- 
- 
- - 
  
- 
- 
- 
- 
- 
- 
- 
- 
- 
- 
- 
- 
- 
- - - Triple clicking a code snippet now always selects it
    
  
- - 
  
- 
- - 
  
- 
- 
- - 
  
- 
- 
- 
- - 
  
- 
- 
- 
- 
- - 
  
- 
- 
- 
- 
- 
- - 
  
- 
- 
- 
- 
- 
- 
- - 
  
- 
- 
- 
- 
- 
- 
- 
- - 
  
- 
- 
- 
- 
- 
- 
- 
- 
- - 
  
- 
- 
- 
- 
- 
- 
- 
- 
- 
- - 
  
- 
- 
- 
- 
- 
- 
- 
- 
- 
- 
- - 
  
- 
- 
- 
- 
- 
- 
- 
- 
- 
- 
- 
- - 
  
- 
- 
- 
- 
- 
- 
- 
- 
- 
- 
- 
- 
- - 
  
- 
- 
- 
- 
- 
- 
- 
- 
- 
- 
- 
- 
- 
- - 
  
- 
- 
- 
- 
- 
- 
- 
- 
- 
- 
- 
- 
- 
- - Refactor error occurrence context items types
  
- 
- 
- 
- 
- 
- 
- 
- 
- 
- 
- 
- 
- 
- - Log error to console when sharing to Flare goes wrong
  
- 
- 
- 
- 
- 
- 
- 
- 
- 
- 
- 
- 
- 
- 

**Full Changelog**: https://github.com/spatie/ignition/compare/1.2.10...1.3.0

## 1.2.10 - 2022-05-10

- Bump @flareapp/ignition-ui dependency to 3.3.5 (improves handling for missing stack trace frames)
- Log error to console when sharing to Flare fails

**Full Changelog**: https://github.com/spatie/ignition/compare/1.2.9...1.2.10

## 1.2.9 - 2022-04-23

- Bump Ignition UI version to pull in changes

**Full Changelog**: https://github.com/spatie/ignition/compare/1.2.8...1.2.9

## 1.2.8 - 2022-04-23

## What's Changed

- Update .gitattributes by @angeljqv in https://github.com/spatie/ignition/pull/120
- Fix flash of unstyled content in Livewire modals by @willemvb in https://github.com/spatie/ignition/pull/118
- Don't add unnecessary URL fragments to share and settings menu

## New Contributors

- @angeljqv made their first contribution in https://github.com/spatie/ignition/pull/120

**Full Changelog**: https://github.com/spatie/ignition/compare/1.2.7...1.2.8

## 1.2.7 - 2022-03-29

- Move stylesheet and darkmode script to `head` tag of error page

**Full Changelog**: https://github.com/spatie/ignition/compare/1.2.6...1.2.7

## 1.2.6 - 2022-03-23

## What's Changed

- Enable (slightly bigger) development build to make debugging Ignition issues easier
- Speed up tests run process by @kudashevs in https://github.com/spatie/ignition/pull/105

**Full Changelog**: https://github.com/spatie/ignition/compare/1.2.5...1.2.6###

## 1.2.5 - 2022-03-19

- Disable "Share to Flare" feature based on Ignition config value

**Full Changelog**: https://github.com/spatie/ignition/compare/1.2.4...1.2.5

## 1.2.4 - 2022-03-11

- Pass an already initialised `Report` object to Flare client (instead of creating a new instance)
- Bump `spatie/flare-client-php` version to support passing an initialised report to flare
- Fix the `renderException` method to only render the Ignition error page (without also sending a report)
- Remove `spatie/ray` dependency

**Full Changelog**: https://github.com/spatie/ignition/compare/1.2.3...1.2.4

## 1.2.3 - 2022-03-08

## What's Changed

- Suppress file check by @kudashevs in https://github.com/spatie/ignition/pull/91

**Full Changelog**: https://github.com/spatie/ignition/compare/1.2.2...1.2.3

## 1.2.2 - 2022-03-08

## What's Changed

- fix exception caused by file_exists by @dianfishekqi in https://github.com/spatie/ignition/pull/90

## New Contributors

- @dianfishekqi made their first contribution in https://github.com/spatie/ignition/pull/90

**Full Changelog**: https://github.com/spatie/ignition/compare/1.2.1...1.2.2

## 1.2.1 - 2022-03-04

- Ignition UI bugfix: stacktrace with only one vendor frame no longer crashes Ignition

**Full Changelog**: https://github.com/spatie/ignition/compare/1.2.0...1.2.1

## 1.2.0 - 2022-03-04

## What's Changed

- The possibility to specify a path to the settings file using a new `ConfigManager` interface by @kudashevs in https://github.com/spatie/ignition/pull/57

**Full Changelog**: https://github.com/spatie/ignition/compare/1.1.1...1.2.0

## 1.1.1 - 2022-03-02

## What's Changed

- Create new build for Ignition-UI changes
- Update README.md by @biscuit-deluxe in https://github.com/spatie/ignition/pull/54

## New Contributors

- @biscuit-deluxe made their first contribution in https://github.com/spatie/ignition/pull/54

**Full Changelog**: https://github.com/spatie/ignition/compare/1.1.0...1.1.1

## 1.1.0 - 2022-03-01

## What's Changed

- fix: don't let `exception_message` be `null` by @innocenzi in https://github.com/spatie/ignition/pull/45
- Update .gitattributes by @PaolaRuby in https://github.com/spatie/ignition/pull/46
- Set `vscode` as default editor by @AlexVanderbist in https://github.com/spatie/ignition/pull/53
- Add error boundaries

## New Contributors

- @PaolaRuby made their first contribution in https://github.com/spatie/ignition/pull/46

**Full Changelog**: https://github.com/spatie/ignition/compare/1.0.5...1.1.0

## 1.0.5 - 2022-02-17

## What's Changed

- Immediately open new shares in new tab (owner URL is no longer required)
- Render initial theme class in HTML by @willemvb in https://github.com/spatie/ignition/pull/31
- fix: Convert query bindings to an array before mapping by @innocenzi in https://github.com/spatie/ignition/pull/43

## New Contributors

- @willemvb made their first contribution in https://github.com/spatie/ignition/pull/31
- @innocenzi made their first contribution in https://github.com/spatie/ignition/pull/43

**Full Changelog**: https://github.com/spatie/ignition/compare/1.0.4...1.0.5

## 1.0.4 - 2022-02-16

## What's Changed

- Refine the Windows OS check by @kudashevs in https://github.com/spatie/ignition/pull/40

## New Contributors

- @kudashevs made their first contribution in https://github.com/spatie/ignition/pull/40

**Full Changelog**: https://github.com/spatie/ignition/compare/1.0.3...1.0.4

## 1.0.3 - 2022-02-13

## What's Changed

- Update incorrectly documented namespace by @imliam in https://github.com/spatie/ignition/pull/23
- Ensure example exception is... an exception by @imliam in https://github.com/spatie/ignition/pull/24
- add check to make sure ConfigFilePath is readable by @leafling in https://github.com/spatie/ignition/pull/36

## New Contributors

- @imliam made their first contribution in https://github.com/spatie/ignition/pull/23
- @leafling made their first contribution in https://github.com/spatie/ignition/pull/36

**Full Changelog**: https://github.com/spatie/ignition/compare/1.0.2...1.0.3

## 1.0.2 - 2022-01-19

- remove Laravel specific bits

## 1.0.1 - 2022-01-18

- bug fixes

## 1.0.0 - 2022-01-18

- stable release
