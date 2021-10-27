***1. Structure:***

One container component fetches all data and handles most of the buisness logic, then passes props to presentational component which consists of multiple modals.

***2. User interface:***

User selects a make. Models are fetched based on the input. After selecting model, more (not required) filters appear. Every input on one filter influences options for other filters to help user find his configuration as fast as possible. Number of vehicles is displayed above filters: if user forgets some parameters of his vehicle but number of vehicles is small enough for him, he can click "Show vehicles" to select from remaining records. Since it doesn't take too much space (vehicles list should have scrollbar for desktop), component should be reusable in any place of the real app.

***3. Project setup***

```shell script
yarn
```

```shell script
yarn start
```
