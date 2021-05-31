**DO NOT USE YET, THIS PACKAGE IS IN DEVELOPMENT**

# Ignition: a beautiful error page for PHP apps

[![Latest Version on Packagist](https://img.shields.io/packagist/v/spatie/ignition.svg?style=flat-square)](https://packagist.org/packages/spatie/ignition)
![Tests](https://github.com/spatie/ignition/workflows/Run%20tests/badge.svg)
[![Total Downloads](https://img.shields.io/packagist/dt/spatie/ignition.svg?style=flat-square)](https://packagist.org/packages/spatie/ignition)

[Ignition](https://flareapp.io/docs/ignition-for-laravel/introduction) is a beautiful and customizable error page for PHP applications

![Screenshot of ignition](https://facade.github.io/ignition/screenshot.png)

Here's the a minimal example.

```php
use Spatie\Ignition\Ignition;

include 'vendor/autoload.php';

Ignition::make()->register();

throw new Exception('Bye world');
```

## Official Documentation

The official documentation for Ignition can be found on the [Flare website](https://flareapp.io/docs/ignition-for-laravel/installation).

## Support us

[<img src="https://github-ads.s3.eu-central-1.amazonaws.com/ignition.jpg?t=1" width="419px" />](https://spatie.be/github-ad-click/ignition)

We invest a lot of resources into creating [best in class open source packages](https://spatie.be/open-source). You can support us by [buying one of our paid products](https://spatie.be/open-source/support-us).

We highly appreciate you sending us a postcard from your hometown, mentioning which of our package(s) you are using. You'll find our address on [our contact page](https://spatie.be/about-us). We publish all received postcards on [our virtual postcard wall](https://spatie.be/open-source/postcards).

### Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information what has changed recently.

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md) for details.

## Security Vulnerabilities

Please review [our security policy](../../security/policy) on how to report security vulnerabilities.

## Credits

- [Spatie](https://spatie.be)
- [All Contributors](../../contributors)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
