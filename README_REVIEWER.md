# A few considerations about what was asked and what I did 

## Caching
Due to the nature of the application, I believe that the data used does not change often, so we can cache the responses from the calls for a reasonable amount of time (trip-of-the-day for 1 day, 1 hour for other calls). 
The calls are cached by the service worker, so we can only verify the correct functioning in the production version.
I have, however, provided an additional implementation of caching using the RxJs operator shareReplay.

To see service worker in action, a possible approach is as follows:
1. npm install --global http-server (or another package manager, I used bun)
2. nx build
3. cd dist/app-trips/browser
4. http-server -p 8081
5. navigate to http://127.0.0.1:8081/en-US

## Performance
I mainly considered the following aspects to improve performance:

1. Standalone Components for better modularization and tree-shaking, which can lead to smaller bundle sizes and improved load times.
2. Lazy loading routes and components with @defer
3. Service worker for caching static assets and responses
4. Use of custom components to avoid external library dependencies
5. Signals in combination with RxJs

## Accessibility
*"App Trips can have users from various countries."*

I have implemented support for both English (default) and Italian languages. However, I did not include all translations, as I deemed it unnecessary in this context. 

## TESTING
All tests were done with Karma; I saw that it is currently deprecated, but in the official documentation, they still do not suggest using Jest since it is still in the experimental phase.


## GIT
I used only one branch for this challenge because I am the only developer working on this project. In a professional environment, I would create different branches for features, bug fixes, refactoring, etc., according to the team's specifics and open pull requests.
