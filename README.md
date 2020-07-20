# Anagog
## Structure
- `components` - Project components
- `containers` - Project containers
- `api`        - mock Api
- `redux`      - Redux actions\reducers
- `utils`      - Helpers
- `constants`  - Constants

## Build
#### Requirements:
- nodejs

Install dependencies:

```
npm install
```

Enable scripts:

#Start dev server
```
npm run start
```
#Create production build
```
npm run build
```

## Tests

#Run jest
```
npm run test
```

#Run tslint
```
npm run lint
```

## Login
Credentials:
```
name: admin
password: admin
```

## Notes
For better side effects, I would suggest to use redux-saga, which can be implemented within larger time period. Also with larger time period project could have more tests coverage. I have implemented several tests to show this as one of the programming practices I usually use.
