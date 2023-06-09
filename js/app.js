class CalorieTracker {
  constructor() {
    this._calorieLimit = 2000;
    this._totalCalories = 0;
    this._meals = [];
    this._workouts = [];
    this._displayCaloriesLimit();
    this._displayCaloriesTotal();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
    this._displayCaloriesProgress();
  }
  // Public Methods/API
  addMeal(meal) {
    this._meals.push(meal);
    this._totalCalories += meal.calories;
    this._render();
  }

  addWorkout(workout) {
    this._workouts.push(workout);
    this._totalCalories -= workout.calories;
    this._render();
  }

  // Private Methods
  _displayCaloriesTotal() {
    const totalCaloriesEl = document.getElementById('calories-total');
    totalCaloriesEl.innerHTML = this._totalCalories;
  }
  _displayCaloriesLimit() {
    const calorieLimitEl = document.getElementById('calories-limit');
    calorieLimitEl.innerHTML = this._calorieLimit;
  }

  _displayCaloriesConsumed() {
    const caloriesConsumedEl = document.getElementById('calories-consumed');
    const consumed = this._meals.reduce(
      (total, meal) => total + meal.calories,
      0
    );
    caloriesConsumedEl.innerHTML = consumed;
  }

  _displayCaloriesBurned() {
    const caloriesBurnedEl = document.getElementById('calories-burned');
    const burned = this._workouts.reduce(
      (total, workout) => total + workout.calories,
      0
    );
    caloriesBurnedEl.innerHTML = burned;
  }

  _displayCaloriesRemaining() {
    const caloriesRemainingEl = document.getElementById('calories-remaining');
    const progressEl = document.getElementById('calorie-progress');

    const remaining = this._calorieLimit - this._totalCalories;
    caloriesRemainingEl.innerHTML = remaining;

    if (remaining <= 0) {
      caloriesRemainingEl.parentElement.parentElement.classList.remove(
        'bg-light'
      );
      caloriesRemainingEl.parentElement.parentElement.classList.add(
        'bg-danger'
      );
      progressEl.classList.remove('bg-success');
      progressEl.classList.add('bg-danger');

      return;
    }
  }

  _displayCaloriesProgress() {
    const progressEl = document.getElementById('calorie-progress');
    const progress = (this._totalCalories / this._calorieLimit) * 100;
    const width = Math.min(progress, 100);
    progressEl.style.width = `${width}%`;
  }

  _render() {
    this._displayCaloriesTotal();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
    this._displayCaloriesProgress();
  }
}

class Meal {
  constructor(name, calories) {
    this._id = Math.random().toString(16).slice(2);
    this.name = name;
    this.calories = calories;
  }
}

class Workout {
  constructor(name, calories) {
    this._id = Math.random().toString(16).slice(2);
    this.name = name;
    this.calories = calories;
  }
}

class App {
  constructor() {
    this._tracker = new CalorieTracker();

    document
      .getElementById('meal-form')
      .addEventListener('submit', this._newMeal.bind(this));
    document
      .getElementById('workout-form')
      .addEventListener('submit', this._newWorkout.bind(this));
  }

  _newMeal(e) {
    e.preventDefault();

    const mealName = document.getElementById('meal-name');
    const mealCalories = document.getElementById('meal-calories');

    // Validate Inputs

    if (mealName.value === '' || mealCalories.value === '') {
      alert('Please fill in all fields');
      return;
    }

    const meal = new Meal(mealName.value, +mealCalories.value);
    this._tracker.addMeal(meal);
    mealName.value = '';
    mealCalories.value = '';

    const collapseMeal = document.getElementById('collapse-meal');
    const bsCollapse = new bootstrap.Collapse(collapseMeal, { toggle: true });
  }

  _newWorkout(e) {
    e.preventDefault();

    const workoutType = document.getElementById('workout-name');
    const workoutBurnedCalories = document.getElementById('workout-calories');

    // Validate Inputs

    if (workoutType.value === '' || workoutBurnedCalories.value === '') {
      alert('Please fill in all fields');
      return;
    }

    const workout = new Workout(
      workoutType.value,
      +workoutBurnedCalories.value
    );
    this._tracker.addWorkout(workout);
    workoutType.value = '';
    workoutBurnedCalories.value = '';

    const collapseWorkout = document.getElementById('collapse-workout');
    const bsCollapse = new bootstrap.Collapse(collapseWorkout, {
      toggle: true,
    });
  }
}

const app = new App();
