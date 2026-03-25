---
version: 1
mode: solo
token_profile: balanced
models:
  research: claude-sonnet-4-6
  planning: claude-opus-4-6
  execution: claude-sonnet-4-6
  completion: claude-sonnet-4-6
phases:
  skip_research: false
  skip_reassess: true
  skip_slice_research: true
budget_ceiling: 200.00
budget_enforcement: pause
context_pause_threshold: 70
branching: none
custom_instructions:
  - "LÍMITE DE BÚSQUEDAS WEB: Máximo 50 web searches por fase de research. Nunca repitas una búsqueda con la misma query o una query semánticamente equivalente. Antes de buscar, revisá si ya tenés esa información en el contexto o en KNOWLEDGE.md. Si llegás a 50 búsquedas, dejá de buscar y trabajá con lo que tenés."
  - "PRIORIDAD DE FUENTES: Siempre consultá KNOWLEDGE.md primero. Solo buscá en la web información que NO esté cubierta ahí. Si KNOWLEDGE.md ya tiene datos suficientes sobre un tema, no busques más sobre ese tema."
  - "ESCRIBÍ EL OUTPUT TEMPRANO: No esperes a tener toda la información para empezar a escribir el archivo de output. Escribí un borrador parcial después de las primeras 10-15 búsquedas y luego refinalo si necesitás más datos."
---
