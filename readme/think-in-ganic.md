# Think in Ganic

A component is an alive creature. It's like a biological unit. To describe a component properly in programming language is one of the biggest challenges for all of us.

Imagine an application is as complicated as the cellular below. How could we manage them properly?

![Quantification of Cellular Organelle Size](./images/cellular.png?raw=true "Quantification of Cellular Organelle Size")
<br/><sub style="font-size: .7em;">Thanks for the image from https://meetings.ami.org/2018/project/quantification-of-cellular-organelle-size/</sub>

## What makes an application?

Application is made of components. We manage each component well, then we can manage an application well.

A component is about to be unpredictable. We try to make it as predictable as possible. Data transparency makes things easy for us to develop, debug, maintain and make change.

For a component, data comes all the way, all the time. Data management and data processing are our programming life.

## What makes a component?

1. A component is a child of its parent component;
2. A component has a set of children components;
3. A component contains **something** except its children.

The **something** is the root cause of our challenge.

A component does three tasks
1. Be managed as a child;
2. Manage its children components;
3. Do its **own business**.

## Why Hooks?

Hooks help describe a component's **own business (the something)** in a human understandable way.

With Hooks, literally we **use** everything, to manage the data income and outcome from different worlds outside of the **components tree**.

## What do we care?

We care data change. All we care is CHANGE; All we do is making CHANGE. In Ganic, change means `!shallowEqual(deps, newDeps)`;

NO CHANGE, NO UPDATE!

## Data Smuggling
Update data without trggering any update

``` javascript
// no update will be triggered
deps.smuggler.goods = somethingFresh;
```
