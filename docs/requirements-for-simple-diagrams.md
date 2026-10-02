# Requirements for diagrams

Create the following diagrams in plantUML.
Render and embed them into the design document (named after the main system
component, e.g. `drone-response_design.md`; see General Instructions below).
Explain any design decisions and assumptions also in that document.
## Use Case Diagram
- The system boundary (the rectangle) is the part to be developed. **Only what is inside the box is our job to build; `<<system>>` actors are existing systems** that are given, not built.
- Draw the `<<system>>` actors **on the right of the box**; human actors remain on the left.
- If actor-use case relations are directed, this should reflect activation  
  (use case --> actor means that system triggers interaction, actor --> use case means that actor triggers interaction).
    - Normally human actors **trigger** the interaction: `actor --> use case` unless the system sends notifications, alerts, or similar, where the activation is reversed.
    - For `<<system>>` actors, the typical case is a **directed arrow FROM the use case TO the actor** (`use case --> actor : label`): it indicates that the **use case invokes the external system** (system --> actor activation), but if an external service notifies or alerts the system, the arrow's direction is reversed.
- Actors are appropriate to the system scope:
  - If the system is a backend service: actors should be technical roles (requestor, provider, registry) represented as `<<system>>` actors.
  - If the scope includes a UI: human actors are allowed and expected.
- Use cases represent high-level functionality, not UI actions.
    - Use `<<include>>` and `<<extends>>` sparingly, for relating with subsidiary use cases that are also directly linked to actors, not for internal decomposition 
- Use case - actor and actor - use case relations must be unlabelled.
- Use case names align with later interactions.


## Sequence Diagrams
- Lifelines reflect the **current component decomposition** from the component diagram (slim and high-level): do not introduce finer lifelines than the components in the component diagram.
- Lifelines represent component or service instances.
- Message order reflects the intended workflow.
- Message names and parameters are consistent with interfaces.
- Return messages match preceding calls.
- Message labels are either:
  - operation calls (on solid call arrows), OR  
  - variables for return values (on dashed return arrows).  
  Typing information is not required here.

## Component Diagram (Type Level)
- Components and services are clearly distinguished.
- The decomposition is **slim and high-level** by default: group cohesive
  responsibilities into a few components (one human-facing UI, one
  orchestrator, one service for domain analysis, plus the distinct external
  parties) and **decompose later** when more detail is needed. 
- Each component's boundary and the overall architectural choice are
  **justified in the design document**; any later decomposition must re-justify it.
- Physically distinct or third-party parties (vehicles, regulatory/third-party services, external consumers) are kept as separate external components.
- Interfaces use **lollipop notation** — no separate interface declaration box:
  - A lollipop `()` carries the interface name and is connected by a solid **double dash '--'** lin to the component that **implements** it:
    `ServerInterface -- ServerComponent`.
  - A client component **requires** the interface via a dashed usage relation
    instead of a socket: `[ClientComponent] ..> ServerInterface`.
  - The dashed arrow replaces the socket; there are no sockets and no
    ball-and-socket glyphs.
- Interfaces are always labelled (the lollipop is named, e.g. `Data Access`).
- PlantUML notation (verified):
  ```plantuml
  component "ServerComponent" as SC
  component "ClientComponent" as CC
  () "ServerInterface" as SI

  SC -- SI
  CC ..> SI
  ```
  The lollipop `ServerInterface` is attached to the **ServerComponent**
  (the implementing component) and the **ClientComponent** requires it through `..> ServerInterface`.
  This replaces the socket notation: no sockets, no interface boxes.
- Never connect two components directly; every dependency routes through an
  interface.
- All interacting components appear in sequence diagrams.


## Interfaces
- UML `<<interface>>` notation is used correctly.
- Interfaces ONLY have operation signatures, no attributes or associations.
- If used, inheritance relations between interfaces are semantically meaningful.
- Each operation has:
  - a name,
  - parameter list with types,
  - a return type.
- Operations correspond exactly to messages in sequence diagrams.
- Parameter and return types are defined in the class diagram.
- **Pre- and postconditions are specified for every operation**, each in one or
  two sentences. For each interface and each operation state which conditions
  must hold when the operation is invoked (precondition) and what the client
  may rely on afterwards (postcondition). Pre/postconditions are shown with the
  interface, e.g. as a note attached to the interface in the diagram.

## Data Model (Class Diagram)
- All domain concepts from requirements and interfaces are represented.
- Attributes vs associations are used correctly:
  - a class should not have an attribute of a type that is another class in the diagram  
    (this should be an association).
- Multiplicities are present and meaningful.
- No components or services are modelled as classes.

## Interface State Machine 
- Create an interface state machine for each component consistent with the scenarios expressed by the sequence diagrams and the interfaces implemented and used by the component.
- Each lifeine of a component in any sequence diagram should correspond to a valid execution of the state machine. 
- *Events* of the state machine must correspond to incoming calls of operations in interfaces *implemented* by the component.
- *Actions* of the state machine must correspond to outgoing calls of operations in interfaces *used* by the component. 

## Object-oriented Design for Selected Components
When instructed to generate an OO design for selected components:
- Create a separate OO design level sequence diagram for each operation of any interface implemented by the component. This should describe messages between the internal objects, not with other components. 
- Create an OO class diagram for the implementation of the component, consistent with all its sequence diagrams.  

## General Instructions
- We distinguish three phases: **requirements, architectural design, OO design**.
    - When prompted to create a **requirements** model, generate use cases and sequence diagrams only.
    - When prompted to create an **architectural design** model, generate the component and data model class diagram including component interfaces. Use existing requirements models as context unless instructed to regenerate it.
    - When prompted to create an **OO design** model for selected components, generate the OO sequence and OO class diagram. Use existing requirements and architectural design models as context unless instructed to regenerate them.
- **Design document.** The rendered diagrams are embedded into one design
  document named after the main system component: `drone-response_design.md`
  in `docs/`. The document follows the outline of this file (Use Case Diagram, Sequence Diagrams, Component Diagram, Interfaces, Data Model).
- **Architecture & interaction-style decision.** Directly after the Use Case
  Diagram and before the Sequence Diagram, the design document must include a
  section that lists candidate architecture and interaction styles (e.g.
  layered monolith, microservice, MVP-style UI, event-driven / publish-
  subscribe) and decides which is most appropriate for this application,
  justifying the choice. It must NOT repeat diagram-style or level-of-detail
  rules, which are only specified here in this file.
- **Rendered assets.** Diagram PNGs are saved under `docs/assets/` and linked
  from the design document (relative link `assets/<diagram>.png`). SVG sources
  may stay under `diagrams/generated/`.
- **Regeneration.** Regenerate in the scope of the in-scope use case(s) from
  the system requirements; remove diagrams of out-of-scope use cases. Every
  instruction in this file applies to every regeneration.
- Pipeline: `.puml` sources live in `diagrams/`; the `build.py` commands
  `render`, `embed`, `status`, `plan`, `fetch` and `all` perform the
  corresponding steps (`all` = read spec + requirements, render, embed).

---

# Refinements for Simple Case Study (additional to the base rules above)

## Scope of the simple study
- Generate exactly **two in-scope use cases** with two different actors.
- Produce **two variants** of every artifact: **monolith · orchestration** and
  **microservices · choreography**, displayed so the structural difference is visible.
- Deliverables stop at the **component diagram**: generate, in the base order, the use case diagrams, the architecture & interaction-style decision, the sequence diagrams and the component diagrams. Interfaces, data model, state machines and OO design are
  out of scope unless a later prompt widens the scope.
- **Limitation on size:** at most **four components** per component diagram and at most **four lifelines** per sequence diagram.

## Use case diagrams
- Two use case diagrams in this study:
  - monolith · orchestration
  - microservices · choreography

## Sequence diagrams
- Two versions of every sequence diagram in this study:
  - monolith · orchestration
  - microservices · choreography
- Lifelines reflect the **current component decomposition** (one lifeline per component; never finer than the component diagram).
- **No alternatives or iteration:** no `alt` / `loop` / `opt` blocks — only linear main-success flows.
- When embedding sequence diagrams, stack the two variants **one underneath the other** (full width), not side-by-side.

## Component diagrams
- Two use componet diagrams in this study:
  - monolith · orchestration
  - microservices · choreography
- **No packages** in the diagram. The system boundary is expressed with stereotypes: 
    - in-scope components get `<<module>>` (monolith) / `<<service>>` (microservices), and
    - existing systems get `<<external system>>`; the legend states the scope rule.
- Keep the decomposition slim and high-level; physically distinct or third-party parties stay separate external components.

## Design document
- The document keeps the base outline: use case diagram → architecture & interaction-style decision → sequence diagrams → component diagram.
- Create a **single table for scope and architecture choices** (one row per
  component, one column per variant, plus a responsibility column).
- **Discuss the consequences of the architecture choices on non-functional requirements**: security, cost of deployment and communication, reliability, auditability / transparency, safety and summarise in a single table with two columns for the architecture choices and one row per non-functional requirement.

---

# Publishing the simple-study documents

Publish exactly three files, with these paths, to a public GitHub repository. Leave PlantUML sources, rendered PNG and SVG files, and every other file in this folder unpublished.

| Path | Role |
|------|------|
| `docs/system-requirements.md` | UC1 and UC2 scope and the two architecture choices |
| `docs/requirements-for-simple-diagrams.md` | Diagram rules, including this section |
| `docs/drone-response_design-simple-cursor.md` | The generated simple design |

- **Repository:** [rh122/UML-SOA](https://github.com/rh122/UML-SOA)
- **Visibility:** public
- **Default branch:** `main`
- **GitHub user:** `rh122`

**Where authentication comes from.** The GitHub CLI on this Mac is already logged in as `rh122`. Credentials stay in the macOS keyring (`gh auth status` reports `keyring`). Git over HTTPS for `github.com` uses the helper `gh auth git-credential` (the Homebrew `gh` binary is also registered for that host). The maritime-fuzzy-logic checkout uses the same `gh` login for `https://github.com/rh122/maritime-fuzzy-logic.git`. Do not copy tokens, `.env` files, keychain items, or that checkout's local `osxkeychain` credential helper into this folder or into UML-SOA.

The publish commit is authored as `rh122` with the public GitHub noreply address `35560675+rh122@users.noreply.github.com`. That address is set only in the temporary repository below.

**Commands.** Create the empty public repository from any directory that is not this folder (so `gh` does not attach a remote here):

```bash
gh repo create rh122/UML-SOA --public \
  --description "DroneResponse simple UML case study"
```

If that repository already exists and contains only these documents, reuse it. If it contains unrelated files, stop.

Stage the three documents in a temporary git repository. The UML folder is not that repository, and it is not given a git remote.

```bash
UML_DIR="/Users/rh122/Library/CloudStorage/OneDrive-UniversityofLeicester/Projects/UML"
PUBLISH_DIR="$(mktemp -d)"
mkdir -p "$PUBLISH_DIR/docs"
cp "$UML_DIR/docs/system-requirements.md" \
   "$UML_DIR/docs/requirements-for-simple-diagrams.md" \
   "$UML_DIR/docs/drone-response_design-simple-cursor.md" \
   "$PUBLISH_DIR/docs/"
cd "$PUBLISH_DIR"
git init -b main
git add \
  docs/system-requirements.md \
  docs/requirements-for-simple-diagrams.md \
  docs/drone-response_design-simple-cursor.md
git -c user.name='rh122' \
    -c user.email='35560675+rh122@users.noreply.github.com' \
    commit -m "Publish the DroneResponse simple design documents"
git remote add origin https://github.com/rh122/UML-SOA.git
git push -u origin main
```

Confirm the default branch and that the tree contains only those three paths:

```bash
gh repo view rh122/UML-SOA --json url,isPrivate,defaultBranchRef
gh api repos/rh122/UML-SOA/git/trees/main?recursive=1 --jq '.tree[].path'
```