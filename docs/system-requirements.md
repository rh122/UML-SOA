# System requirements

Scope: the **UC1** and **UC2** main use cases from [sUAS-UseCases (SPLC-2020)](https://github.com/SAREC-Lab/sUAS-UseCases).

- UC1 "River & Ice Search & Rescue" — primary actor **Drone Commander**: https://github.com/SAREC-Lab/sUAS-UseCases/blob/SPLC-2020/usecases/main/RiverRescue.md
- UC2 "Deliver Item to Target Location" — primary actor **Dispatcher**: https://github.com/SAREC-Lab/sUAS-UseCases/blob/SPLC-2020/usecases/main/ItemDelivery.md

## Design choices

These apply throughout use case, sequence and component diagrams, where we want to compare these two options
- **monolith · orchestration:** only the **Airspace Service** is a `<<system>>` actor (the drone fleet is in scope, part of the box);
- **microservices · choreography:** both the **Airspace Service** and the **Fleet Service** are `<<system>>` actors (both outside the box).

