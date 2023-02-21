# test project

### Install

```
yarn install
```

### Running

```
yarn pod && yarn ios              // Running iOS
yarn android           // Running Android
```

### Testing

```
yarn test
```

### Documentation folder structure

Here is the documentation of the current application folder structure
```
    .
    ├── ...
    ├── app                             # app directory
    │   │
    │   ├── common                      # All common files
    │   │
    │   ├── components                  # All components
    │   │    ├── home                    # home components
    │   │    ├── ...
    │   │    ├── ...
    │   │    ├── ...
    │   │
    │   │
    │   ├── config                        # All config for app
    │   │    └── index.js               # config for react navigation
    │   │
    │   ├── services
    │   │    └── saga.js
        │── app.js                      # root app
    │
    │   │
    │   └── ...                        # etc.
    └── scripts                          # all scripts for app
```
### Common Error Build
........

