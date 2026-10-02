# DroneResponse

Two use cases, two boundaries. Same missions. Different place to draw the box.

- **UC1** River and Ice Search and Rescue — Drone Commander
- **UC2** Deliver Item to Target Location — Dispatcher

---

# Use cases — monolith · orchestration

![Use case diagram — monolith · orchestration](assets/cursor_uc_mono.png)

The fleet is inside the box. Only Airspace Service already exists. The commander starts the search. The dispatcher starts the delivery. Both use cases ask Airspace Service for a permit.

---

# Use cases — microservices · choreography

![Use case diagram — microservices · choreography](assets/cursor_uc_micro.png)

The same two people, the same two use cases. Fleet Service and Airspace Service both sit outside the box. We build the portal and the mission record.

---

# Architecture choice

Owning the fleet goes with one orchestrator. An existing fleet goes with choreography.

- **monolith · orchestration** — Operator Console, Mission Manager, and Drone Fleet ship together. Mission Manager reserves the aircraft, obtains the permit, then orders the flight.
- **microservices · choreography** — Operator Portal and Mission Registry are the services we deploy. They publish what is known. Fleet Service asks Airspace Service for its own permit and flies.

---

# UC1 — monolith · orchestration

![UC1 — monolith · orchestration](assets/cursor_seq_uc1_mono.png)

Mission Manager orders every step: reserve, permit, then search. The console confirms the sighting before tracking starts.

---

# UC1 — microservices · choreography

![UC1 — microservices · choreography](assets/cursor_seq_uc1_micro.png)

The portal records the search and the confirmation. The fleet obtains the permit itself. The registry keeps the record and alerts the portal.

---

# UC2 — monolith · orchestration

![UC2 — monolith · orchestration](assets/cursor_seq_uc2_mono.png)

Same order for delivery: reserve, permit, then fly. The console hears about the drop, then the landing.

---

# UC2 — microservices · choreography

![UC2 — microservices · choreography](assets/cursor_seq_uc2_micro.png)

The portal requests the delivery. The fleet takes the permit and reports the drop and the landing. The registry forwards those facts.

---

# Components — monolith · orchestration

![Component diagram — monolith · orchestration](assets/cursor_component_mono.png)

Three modules, one existing system. Mission Manager is the only component that calls Airspace Service and the only one that passes a permit into the flight.

---

# Components — microservices · choreography

![Component diagram — microservices · choreography](assets/cursor_component_micro.png)

Two services we deploy. Fleet Service and Airspace Service already exist. The portal never calls the fleet or the airspace authority.

---

# What we build

- **monolith · orchestration** — console, mission manager, and fleet. Airspace Service already exists.
- **microservices · choreography** — portal and mission registry. Fleet Service and Airspace Service already exist.

---

# What changes with the boundary

- **Security and safety.** One process holds the go / no-go decision. With an external fleet, the permit stays between that fleet and airspace.
- **Cost and reliability.** One deployable, and one place that can stop the mission. Two services can fail apart; a lost event can leave the registry behind the fleet.
- **Audit.** The manager sees every call. The registry sees the mission facts and a permit reference, not the permit itself.
