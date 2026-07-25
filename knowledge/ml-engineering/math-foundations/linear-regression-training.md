---
title: "Linear Regression (Training)"
description: "See how a linear model learns its weight and bias by measuring prediction errors and repeatedly reducing them."
category: ml-engineering
section: math-foundations
pubDate: 2026-07-25
topics:
  - linear regression
  - model training
  - mean squared error
  - gradients
---

In the
[Linear Regression forward-pass lesson](/knowledge/ml-engineering/math-foundations/linear-regression-forward/),
we estimated investigation effort with this model:

`predicted analyst-hours = w × affected endpoints + b`

The calculation was straightforward once we had a weight `w` and a bias `b`.
But who decides what those two parameters should be?

Training finds them from completed examples.

For each completed alert, we know:

- the input: how many endpoints were affected, and
- the observed answer: how many analyst-hours the investigation required.

The model begins with poor parameter values, makes predictions, measures its
errors, and adjusts the parameters. It repeats this process until further
adjustments produce little improvement.

## Start with completed investigations

We will use six small alerts:

| Affected endpoints (`x`) | Observed analyst-hours (`y`) |
| ---: | ---: |
| `0` | `2.2` |
| `1` | `3.4` |
| `2` | `5.1` |
| `3` | `6.6` |
| `4` | `8.2` |
| `5` | `9.4` |

The points follow a general upward pattern, but they do not form a perfect
line. That is normal. Two investigations with similar endpoint counts may still
require different amounts of work.

Training will look for one straight line that fits all six examples reasonably
well.

## Follow the training loop

One training update has four parts:

1. **Forward pass:** use the current weight and bias to predict every answer.
2. **Loss calculation:** turn the prediction errors into one number.
3. **Gradient calculation:** measure how changing each parameter would change
   the loss.
4. **Parameter update:** move the weight and bias in the direction that should
   reduce the loss.

The model then returns to the forward pass and repeats the cycle with its new
parameters.

This is the same predict, measure, adjust, and repeat pattern used to train much
larger models. Linear regression lets us see every part without a framework
hiding the calculations.

## Measure the line with mean squared error

For each alert, the model’s error is:

`error = prediction − observed analyst-hours`

Some errors will be positive and others negative. Averaging those raw errors
could allow them to cancel, so we square each error before averaging:

`mean squared error = average of (prediction − observed value)²`

This loss function is called **mean squared error**, or **MSE**:

- **mean** means average,
- **squared error** means every error is multiplied by itself.

Squaring makes every contribution nonnegative and gives larger mistakes a
larger penalty.

Suppose training starts with:

`w = 0`

`b = 0`

The model predicts `0` analyst-hours for every alert. Its initial MSE across the
six examples is:

`40.262`

That number gives training a baseline. A later line is better if it produces a
smaller MSE on these examples.



Leave the learning rate at `0.020` and select **Take one update**. The model
moves from:

`ŷ = 0.00x + 0.00`

to approximately:

`ŷ = 0.75x + 0.23`

The MSE falls from `40.262` to about `15.232`. One update does not find the best
line, but it moves the model in a useful direction.

Select **Reset**, then **Run 12 updates**. The line moves much closer to the
observed points, and the MSE falls to about `0.604`.

You can run another group of updates to keep refining the line. The later
updates produce smaller visible improvements because the model is already near
a useful fit.

## Use gradients to adjust both parameters

The training system needs to know how the loss responds to the weight and the
bias separately.

A **gradient** is a local slope. Here we calculate two gradients:

- the weight gradient estimates how the MSE changes when `w` changes, and
- the bias gradient estimates how the MSE changes when `b` changes.

For our linear model, the formulas are:

`weight gradient = average of 2 × error × x`

`bias gradient = average of 2 × error`

At the starting line `w = 0` and `b = 0`, the gradients are approximately:

`weight gradient = −37.733`

`bias gradient = −11.633`

A negative gradient means increasing that parameter should reduce the loss near
the current position.

The update rule is:

`new parameter = current parameter − learning rate × gradient`

With a learning rate of `0.020`, the first weight update is:

`new w = 0 − 0.020 × (−37.733) ≈ 0.755`

The first bias update is:

`new b = 0 − 0.020 × (−11.633) ≈ 0.233`

Those are the values shown after the first interactive update.

The gradient formulas come from calculus, but their job is practical: tell the
training loop which direction should reduce the current loss and how steep that
loss is.

## The learning rate controls the update size

The **learning rate** determines how much of each gradient the update uses.

- A small learning rate makes cautious progress and may require many updates.
- A useful learning rate reduces the loss steadily.
- A learning rate that is too large may jump past a good line and make the loss
  unstable.

Changing the learning rate does not immediately change the current line. It
changes the size of the next parameter update.

The separate
[Gradient Descent lesson](/knowledge/ml-engineering/math-foundations/gradient-descent/)
explores this behavior in detail.

## What counts as one pass through the data?

In our interactive example, every update uses all six training examples. One
complete pass through the training data is called an **epoch**. Here, one update
is also one epoch.

Large datasets are usually divided into smaller groups called **batches**. Each
batch produces an update, so a large training run may perform many updates
during one epoch.

These terms describe how the data is scheduled:

- **Example:** one completed alert.
- **Batch:** the examples used for one parameter update.
- **Epoch:** one complete pass through all training examples.

## Implement the full loop in Python

The code below reproduces the interactive training process without a
machine-learning library:

```python
endpoints = [0, 1, 2, 3, 4, 5]
actual_hours = [2.2, 3.4, 5.1, 6.6, 8.2, 9.4]

w = 0.0
b = 0.0
learning_rate = 0.02

for update in range(1000):
    # 1. Forward pass
    predictions = [
        w * x + b
        for x in endpoints
    ]

    # 2. Errors and mean squared error
    errors = [
        predicted - actual
        for predicted, actual in zip(predictions, actual_hours)
    ]
    mse = sum(error ** 2 for error in errors) / len(errors)

    if update in {0, 1, 12, 100, 250, 999}:
        print(
            f"update {update:3}: "
            f"w={w:.3f}, b={b:.3f}, mse={mse:.3f}"
        )

    # 3. Gradients averaged across all examples
    grad_w = sum(
        2 * error * x
        for error, x in zip(errors, endpoints)
    ) / len(errors)
    grad_b = sum(
        2 * error
        for error in errors
    ) / len(errors)

    # 4. Parameter update
    w = w - learning_rate * grad_w
    b = b - learning_rate * grad_b
```

Running it produces:

```text
update   0: w=0.000, b=0.000, mse=40.262
update   1: w=0.755, b=0.233, mse=15.232
update  12: w=1.861, b=0.749, mse=0.604
update 100: w=1.617, b=1.632, mse=0.087
update 250: w=1.505, b=2.029, mse=0.017
update 999: w=1.483, b=2.110, mse=0.015
```

The final line is close to:

`ŷ = 1.48x + 2.11`

It does not pass through every point, and its MSE does not reach zero. It finds
the straight line that balances the small disagreements across all six noisy
examples.

## Training loss is not the final test

The loop directly optimizes performance on its training examples. A low
training MSE only tells us that the line fits those examples.

To test whether the relationship also works for new alerts, engineers evaluate
the model on separate completed investigations that were not used for parameter
updates. This separate data is called **validation data**.

If training loss keeps falling while validation performance gets worse, the
model may be learning details that do not carry over to new examples. This
failure is called **overfitting**.

## The training data defines what the model learns

Gradient descent follows the loss produced by the supplied examples. It does
not know whether a record is accurate, representative, or malicious.

Investigation-effort data may have problems such as:

- inconsistent time tracking between response teams,
- missing work performed outside the ticketing system,
- duplicate incidents,
- a training history dominated by small alerts, or
- deliberately altered records.

The optimizer will faithfully learn from those problems unless the surrounding
data pipeline detects them.

## Why security engineers should care

- **Training data is a write-sensitive asset.** Unauthorized changes can move
  the learned parameters and therefore change future predictions.
- **Data lineage matters.** Teams should be able to identify where each
  training record and label came from.
- **Average loss can hide important failures.** A good overall MSE may conceal
  poor estimates for rare, high-impact incidents.
- **Training and validation data must remain separate.** Reusing validation
  answers during parameter updates makes the evaluation look better than it
  really is.
- **Learned parameters are not proof of causation.** A positive endpoint weight
  describes a pattern in the supplied data, not a universal rule about incident
  effort.

## Common wrong ideas

- **“Someone chooses the final weight and bias by hand.”** Engineers choose the
  model and training process; the update loop learns the parameter values from
  data.
- **“Training changes the formula.”** The formula remains `ŷ = wx + b`.
  Training changes `w` and `b`.
- **“The loss must reach zero.”** Noisy real-world examples may not lie on one
  perfect line. The goal is a useful fit that also works on new data.
- **“One lower-loss update proves the model is trained.”** Training usually
  requires many updates plus validation on separate examples.
- **“Gradient descent can detect poisoned records.”** It optimizes the supplied
  loss. It does not determine whether the underlying data should be trusted.

## Check your understanding

#### 1. What are the four parts of one training update?

Run a forward pass, calculate the loss, calculate the gradients, and update the
parameters.


#### 2. Why square the prediction errors?

Squaring prevents positive and negative errors from canceling and gives larger
errors a larger penalty.


#### 3. What does the learning rate control?

It controls how much of each gradient is used when updating the weight and
bias.


#### 4. Why does the fitted line not pass through every point?

The completed investigations contain variation that one straight line cannot
match exactly. Training finds a line that balances the errors across all the
points.


#### 5. Why do we need validation data after training?

Training loss measures fit on examples the optimizer already used. Validation
data checks whether the learned relationship also works on separate examples.


## Keep this mental model

> Training repeats four actions: predict with the current line, measure its
> errors, calculate how the parameters should move, and update them. The data
> supplies the examples; the loss and gradients guide the line.

## Additional practice

NeetCode’s Linear Regression (Training) problem
