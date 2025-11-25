### Design System Overview

- **Visual Style:** "Soft Pop" / Material You.
- **Key Traits:** Large rounded corners, masonry-style layouts, and playfulness.

---

### Block 1: The "Serafina" Music Player (Center)

A full-height immersive media player card featuring large typography and playback controls.

- **Visual Description:** A large vertical container with a blurred album art background. It features a massive serif title "Serafina", a play button zone, and a waveform progress bar at the bottom.
- **Components:**
  - `Card` (The main container with `overflow-hidden`).
  - `Button` (Large primary Play button, smaller Skip/Previous icon buttons).
  - `Section` (To group the controls at the bottom).
  - `Slider` (Required for the waveform/progress bar at the bottom—essential for media players).
  - `Image` (Primitive for the album art).

### Block 2: "Music Night Out" Group Chat (Bottom Left)

A dark-mode messaging interface showing a group conversation context.

- **Visual Description:** A dark card containing a header with overlapping avatars (face pile), a specific message bubble pointing left, and a reply input area.
- **Components:**
  - `Card` (Container with dark background).
  - `Avatar` (Used multiple times: clustered in the header, and one small one next to the message).
  - `Button` (Icon buttons for video call/phone in header).
  - `Input` (The pill-shaped text field saying "Who's got that group photo?").
  - `Badge` (To indicate the active status or notification count on the group icon).
  - `ScrollArea` (To handle the list of messages semantically, even if static here).

### Block 3: "Echo Bridge" Event Invite (Top Left)

A clean, information-dense card for calendar events and RSVP actions.

- **Visual Description:** A light-colored card displaying event title, location, time, and a "pill" shaped toggle group for RSVP status (Going, Not Going, Maybe).
- **Components:**
  - `Card` (Main container).
  - `Label` (For "Where", "When", "Registration").
  - `Button` (Used for the "Going/Not Going" toggles—variants needed: ghost vs. solid).
  - `Avatar` (Small avatar for "Hosted By Odette").
  - `Section` (To layout the grid of information).

### Block 4: Photo Filter/Editor (Top Center)

A horizontal scroll interface for selecting image presets.

- **Visual Description:** A dark interface showing a preview image at the top and a horizontal list of filter options (None, Simple, Verbana) below, plus edit tools.
- **Components:**
  - `Card` (The editor container).
  - `Button` (Icon buttons for Crop, Rotate, etc.).
  - `ScrollArea` (Horizontal scroll is critical here for the filter thumbnails).
  - `Image` (For the filter thumbnails).

### Block 5: "Feeding Times" Alarm Widget (Bottom Right)

A functional utility widget for setting time schedules.

- **Visual Description:** A widget split into two vertical "pills" or cards, displaying large time typography (07:30 AM / 12:30 PM) with toggle switches at the bottom.
- **Components:**
  - `Card` (Outer container).
  - `Section` (Inner containers for the two time columns).
  - `Switch` (The toggle at the bottom of each column).
  - `Label` (For "Feeding times" title).

### Block 6: AI/Voice Assistant Pill (Right Center)

A floating, compact UI element for quick interactions.

- **Visual Description:** A floating, horizontal pill-shaped container (very high border radius). It contains a text prompt "Make me a fit..." and a circular action button.
- **Components:**
  - `Card` (Styled with full rounded corners/pill shape).
  - `Input` (Transparent background input field).
  - `Button` (Circular icon button for the microphone/send action).

### Block 7: Control Center / Quick Settings (Top Right)

A dark-mode system control panel for hardware toggles.

- **Visual Description:** Dark cards containing heavy sliders for volume/brightness and squircle buttons for Wi-Fi, Bluetooth, and Living Room controls.
- **Components:**
  - `Card` (Container).
  - `Button` (Icon buttons with active/inactive states).
  - `Slider` (Thick, touch-friendly sliders for volume and brightness).
  - `Icon` (You likely need a centralized Icon primitive or library, though `Button` can wrap SVGs).

### Block 8: Gardening Checklist (Bottom Left - Overlay)

A "Picture-in-Picture" style layout showing a list of items over an image.

- **Visual Description:** A card featuring a photograph of a plant, with a secondary "paper" card overlaying the bottom right corner containing a checklist of plant varieties.
- **Components:**
  - `Card` (One for the image container, one for the list container).
  - `Checkbox` (For "Snake plant", "Pothos").
  - `Label` (For the list items).
  - `AspectRatio` (To maintain the photo dimensions).

### Block 9: "Aura Wave" Music List (Far Right)

A standard vertical list view for browsing content.

- **Visual Description:** A light card showing a header "Aura Wave" and a vertical list of artist rows. Each row has an avatar, text, and a play button.
- **Components:**
  - `Card` (Container).
  - `Avatar` (Artist images).
  - `Button` (Small icon buttons for play/pause).
  - `Section` (Each row is a section).
  - `NavigationMenu` (The back arrow and "Summarize" pill at the top suggest navigation context).

### Block 10: Fashion Shopping Tag (Top Right)

A product showcase card with interactive hotspots.

- **Visual Description:** A card showing a pair of blue pants. There is a floating "dot" or tag over the pants indicating interactivity.
- **Components:**
  - `Card` (Product container).
  - `HoverCard` (The interaction logic: when hovering the dot, details might appear).
  - `Popover` (Alternative: Clicking the dot opens a popover with price/details).
  - `Button` (The floating dot itself is a rounded-full button).

---

