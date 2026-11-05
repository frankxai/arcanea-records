---
name: Sonic Forge
form: music
difficulty: any
---

# Music Composition Direction Template

```
@form     music
@tone     {epic | intimate | haunting | triumphant | meditative | fierce | melancholic | defiant}
@anchor   {one sonic moment that defines the track — the 5 seconds someone hums back}
@exclude  generic-epic-trailer, stock-music, over-produced, every-instrument-at-once
@element  {element}     (optional — pulls from sonic palette)
```

## The Questions That Matter

**Emotional Arc:** Music is time. What emotion STARTS the track, what does it BUILD toward, and where does it LAND? Three points:
- Opening: {how it begins — not just quiet/loud, but what FEELING}
- Peak: {the moment that hits hardest}
- Resolution: {where you leave the listener — resolved? aching? energized?}

The arc doesn't have to go up. Some of the best tracks descend. Some circle. Some cut off.

**The Anchor Moment:** {anchor} — the 5-second moment someone would sing back to you. Every track that matters has one. It might be:
- A melody that arrives after being teased
- A sudden silence where everything drops out
- Two instruments finding each other in harmony
- A vocal line that says what the listener was feeling but couldn't name

**Sonic Palette:** What instruments and textures dominate? Be specific — not "strings" but "a single cello played slightly too hard, with the bow noise left in." Specificity is the difference between stock music and something that moves.

**Space:** What does the silence between notes sound like? Is there room to breathe, or is every moment filled? The space IS part of the composition. A sparse arrangement with meaning beats a dense one without it.

**Reference, Not Imitation:** Name one real track that lives in the same emotional territory. Then name what to CHANGE. "Like Radiohead's 'Exit Music' but replace the resignation with defiance" is a better brief than a paragraph of adjectives.

**Tempo & Energy:**
- 60-80 BPM: Grounding, heartbeat, meditation, weight
- 80-100 BPM: Walking pace, contemplative, breathing room
- 100-120 BPM: Purposeful, determined, building
- 120-140 BPM: Driving, urgent, physical
- 140+: Aggressive, ecstatic, overwhelming

**Vocal Direction (if applicable):** Language, vocal style (raw/polished/ethereal/spoken), lyrics or wordless, male/female/ambiguous.

## For Suno/Udio

Convert to their format:
```
[genre], [sub-genre], [mood], [tempo BPM], [key instruments], [vocal style]
[lyrics or "instrumental"]
```

## Quality Gate

- [ ] Does the emotional arc have actual MOVEMENT, or is it one mood sustained for 3 minutes?
- [ ] Is there an anchor moment you could hum or describe to a friend?
- [ ] Does the sonic palette have at least one unexpected element?
- [ ] Is there space in the arrangement, or is every frequency filled?
- [ ] Would you listen to this actively (not just as background)?

## Current craft and production integration

Checked 2026-10-01. Use the public [music fundamentals](https://github.com/frankxai/agentic-music-producer-os/blob/18dc9bee02001befb3a2a3bd7747b78f798dff13/docs/MUSIC-FUNDAMENTALS.md), [provider register](https://github.com/frankxai/agentic-music-producer-os/blob/18dc9bee02001befb3a2a3bd7747b78f798dff13/docs/PROVIDER-CAPABILITIES.md) and [factory contract](https://github.com/frankxai/agentic-music-producer-os/blob/18dc9bee02001befb3a2a3bd7747b78f798dff13/docs/MUSIC-FACTORY-CONTRACT.md). They cover harmony/voice leading, groove, motif, prosody, hooks, form, vocals, arrangement, low end, mixing, measured delivery, provenance and durable jobs. Load only the modules needed for this task.

Keep local artist/persona canon, identity, preferences and account entitlements scoped to this project. Shared craft does not assign a singer or overwrite canon. Select the current account-visible Suno model (documented baseline v6); no official public Suno generation API was verified. Lyria, Eleven Music and fal MiniMax Music 3 have separate documented API routes and constraints. A skill or MCP tool is not a connected generation account.

Preserve approved lyrics across adapters. Prepare, authorize/reserve, submit, reconcile, archive, listen, measure, attest rights and stage release separately. Bind receipts to exact contract/asset hashes. Never infer audio quality, measured BPM, playback, rights or publication from a text review or completed job. Unknown paid submissions remain held for reconciliation; no blind rerender.
