# Changelog

All notable changes to `nssivanitesh/react-ubiquitous-composer` will be documented here.

This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-02-27

### Added
- Initial release of the `react-ubiquitous-composer` Laravel/PHP package.
- Standardized PHP DTOs for the complete `react-ubiquitous` UI Config API (`UIStageConfig`, `UIPageConfig`, all `UISectionConfig` variants, all `UIElementConfig` variants, and all supporting types).
- PHP 8.1+ Enums for all literal union types: `UITheme`, `UIPageTransition`, `InputType`, `ResizeBehaviour`, `ButtonVariant`, `ButtonSize`.
- Fluent, immutable builder classes: `StageBuilder`, `PageBuilder`, `ValidationBuilder`.
- `UIHelper` static helper class for concise factory methods.
- `SerializableInterface`, `SectionConfigInterface`, `ElementConfigInterface` contracts.
- `toArray()` serialization on all DTOs — produces the exact JSON shape expected by the `react-ubiquitous` frontend.
- Laravel `ReactUbiquitousServiceProvider` for zero-config auto-discovery.
- PHPUnit test suite covering DTOs, builders, and helpers.
- Full clean architecture: DTOs are pure value objects; builders provide a fluent construction API; helpers add convenience wrappers.
