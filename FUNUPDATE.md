Act as a world-class shader artist and creative frontend engineer specializing in cinematic WebGL hero backgrounds, GLSL fragment shaders, atmospheric lighting, and premium UI motion systems.

I already have the structural “fan/ray” geometry implemented.  
DO NOT redesign the layout or create new shapes.

Your task is ONLY to transform the rendering style and behavior so the fan feels atmospheric, cinematic, alive, and similar to the visual quality of Raycast’s hero backgrounds.

CURRENT PROBLEM:

Right now:
- the fan looks flat
- the teal is too uniform
- the entire structure is fully visible
- the rays feel digitally clean
- there is no depth or atmospheric degradation
- it looks like static vector graphics instead of cinematic light

I want the rays to feel like:
- glowing volumetric light
- partially hidden in darkness
- softly breathing with motion
- textured with analog grain
- fading naturally into the background

BACKGROUND COLOR:

#010506

PRIMARY ACCENT:

#009A93

VISUAL GOAL:

The fan should NOT appear as one fully visible object.

Instead:
- different regions of the fan should emerge and disappear over time
- the teal should flow THROUGH the rays unevenly
- some blades should almost disappear into darkness
- some should softly glow brighter
- edges should dissolve naturally

The composition should feel like:
“light moving inside darkness”

NOT:
“a rendered geometric fan”

-----------------------------------
1. DYNAMIC COLOR FLOW INSIDE THE RAYS
-----------------------------------

The fan blades must contain animated internal color variation.

Inject layered simplex/perlin noise that slowly travels THROUGH the fan geometry.

The motion must:
- be extremely slow
- organic
- fluid
- non-linear
- atmospheric

The noise should dynamically control:
- brightness
- opacity
- glow intensity
- color variation

The teal should smoothly transition between:
- bright teal highlights (#009A93)
- muted teal shadows
- near-black blue-green darkness
- full disappearance into #010506

IMPORTANT:
The rays must never remain evenly colored.

The color should feel like moving light energy drifting across the fan surface.

Avoid:
- flat gradients
- static fills
- identical blade brightness
- hard transitions

Use:
- fbm noise
- domain warping
- layered noise masks
- smoothstep blending
- subtle luminance pulsing

-----------------------------------
2. HIDE THE FULL STRUCTURE
-----------------------------------

The entire fan shape should NOT be clearly readable.

Right now the whole geometry is visible edge-to-edge.

Instead:
- only parts of the fan should be readable at once
- the outer edges should dissolve into darkness
- the top region should fade heavily
- left/right boundaries should disappear naturally

Create a strong atmospheric vignette.

Use:
- radial falloff
- vertical falloff
- opacity masking
- soft light attenuation

The center-middle region behind the hero text should contain the strongest visible glow.

Everything else should softly disappear into the #010506 background.

The effect should create:
- depth
- focus
- tunnel vision
- cinematic contrast

The user’s eye must naturally focus on the headline.

-----------------------------------
3. FILM GRAIN / SPECKLED DISCOLORATION
-----------------------------------

Add a visible cinematic grain layer.

I do NOT want perfectly smooth digital gradients.

The image should contain:
- analog texture
- gritty softness
- subtle speckled discoloration
- film-like degradation

The grain should:
- animate per-pixel
- flicker subtly over time
- be high-frequency
- remain elegant and premium

The grain should especially affect:
- gradient transitions
- glow falloff areas
- darker regions
- soft teal lighting

It should feel inspired by:
- 80s film grain
- analog photography
- CRT softness
- cinematic sensor noise

IMPORTANT:
The grain must NOT look like:
- TV static
- compression artifacts
- random dust overlay

It should feel integrated INTO the lighting itself.

-----------------------------------
4. LIGHTING QUALITY
-----------------------------------

The rendering should feel:
- diffused
- atmospheric
- soft
- volumetric
- cinematic

Use:
- additive blending
- translucent layering
- gaussian-like blur diffusion
- soft bloom behavior
- glow falloff

Edges between rays must melt together naturally.

Avoid:
- crisp geometry
- clean vector edges
- visible separations between blades

-----------------------------------
5. MOTION BEHAVIOR
-----------------------------------

Motion should feel like:
- drifting underwater light
- smoke illuminated by neon
- slow aurora movement
- blurred light leaks

The movement must remain VERY slow.

The background exists to support typography, not distract from it.

No fast animation.
No obvious loops.
No mechanical oscillation.

-----------------------------------
6. TECHNICAL REQUIREMENTS
-----------------------------------

- Keep existing fan geometry
- Modify shader/rendering behavior only
- WebGL2 + GLSL fragment shaders
- React single-file component
- Production-ready
- GPU accelerated
- 60fps optimized
- Responsive resizing
- Preserve text readability
- Canvas remains behind content layer

IMPORTANT FINAL DIRECTION:

The final effect should feel like:
“a partially hidden teal light source moving through darkness with cinematic grain and atmospheric falloff.”

NOT:
“a clean teal geometric background.”