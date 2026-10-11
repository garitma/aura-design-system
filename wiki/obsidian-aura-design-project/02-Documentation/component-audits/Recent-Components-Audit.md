---
title: Recent components audit
date: 2026-10-06
tags: [dev-log, logic, architecture]
---
## Summary
Docs pages first added on 2026-10-05 and 2026-10-06 and still under `apps/www/content/docs/components` were audited one by one. The 21 fails from that pass are fixed in the component and docs sources. The status table lists the pages that remain. Evidence is the MDX page, the demo in `apps/www/components/demos`, and the registry source the page pastes. The docs app was booted after the fix. The OTP preview measured six cells at 39px by 39px. The earlier failure capture remains at `/cursor/stores/self/media/otp-affordance-not-ok-ref.png`.

Utils moved to `apps/www/content/docs/utils` by the menu split are out of this pass: client-only, direction, hitbox, pending, portal, presence, visually-hidden.

## Recurring issues
Resolved in the component fix pass. The notes below keep the original cause.

- Raw `<input>`, `<select>`, and `<input type="range">` do not opt out of unlayered `input:not(.default)` and `select:not(.default)` in `apps/www/styles/main.css`. That rule sets width 100%, height 52px, and padding 26px, and it beats Tailwind `w-3`, `w-12`, and `size-4`. Hit pages: [[Audit-Input-OTP]], [[Audit-Color-Picker]], [[Audit-Phone-Input]], [[Audit-Tags-Input]], [[Audit-Time-Picker]], [[Audit-Compare-Slider]], [[Audit-Media-Player]]. Fix Root Causes.
- Interactive controls do not look like the thing you operate. OTP groups merge into two boxes. The compare seam is not the range. The cropper has no image or resize handle. The carousel has no next control. The tour card does not point at the target. Experience First. Model the Domain.
- Motion is implemented in the component instead of theme tokens. [[Audit-Marquee]] injects keyframes and autoplays. Swap and Shape use `duration-300` where the motion rule asks for 250ms.
- Selection and status collapse to a weak color change. [[Audit-Navigation-Bar]] changes text color only. [[Audit-Status]] paints away, busy, and offline as gray dots.
- [[Audit-Split-Button]] restyles `Button` padding. [[Audit-Date-Picker]] pastes `text-[0.8rem]`. [[Audit-Stack]] offsets cards by 8px, off the 13px grid. [[Audit-Icon]] demo draws a custom SVG.

## Status

| Page | Verdict | Note |
| --- | --- | --- |
| compare-slider | Pass | [[Audit-Compare-Slider]] |
| cropper | Pass | [[Audit-Cropper]] |
| fps | Pass | [[Audit-Fps]] |
| media-player | Pass | [[Audit-Media-Player]] |
| swap | Pass | [[Audit-Swap]] |
| tour | Pass | [[Audit-Tour]] |
| banner | Pass | [[Audit-Banner]] |
| gauge | Pass | [[Audit-Gauge]] |
| kanban | Pass | [[Audit-Kanban]] |
| marquee | Pass | [[Audit-Marquee]] |
| masonry | Pass | [[Audit-Masonry]] |
| qr-code | Pass | [[Audit-Qr-Code]] |
| relative-time-card | Pass | [[Audit-Relative-Time]] |
| scroll-spy | Pass | [[Audit-Scroll-Spy]] |
| scroller | Pass | [[Audit-Scroller]] |
| stack | Pass | [[Audit-Stack]] |
| status | Pass | [[Audit-Status]] |
| timeline | Pass | [[Audit-Timeline]] |
| color-picker | Pass | [[Audit-Color-Picker]] |
| color-swatch | Pass | [[Audit-Color-Swatch]] |
| key-value | Pass | [[Audit-Key-Value]] |
| listbox | Pass | [[Audit-Listbox]] |
| phone-input | Pass | [[Audit-Phone-Input]] |
| rating | Pass | [[Audit-Rating]] |
| tags-input | Pass | [[Audit-Tags-Input]] |
| circular-progress | Pass | [[Audit-Circular-Progress]] |
| icon | Pass | [[Audit-Icon]] |
| loading-indicator | Pass | [[Audit-Loading-Indicator]] |
| search | Pass | [[Audit-Search]] |
| shape | Pass | [[Audit-Shape]] |
| time-picker | Pass | [[Audit-Time-Picker]] |
| expressive-carousel | Pass | [[Audit-Expressive-Carousel]] |
| navigation-bar | Pass | [[Audit-Navigation-Bar]] |
| navigation-rail | Pass | [[Audit-Navigation-Rail]] |
| side-sheet | Pass | [[Audit-Side-Sheet]] |
| chip | Pass | [[Audit-Chip]] |
| fab-menu | Pass | [[Audit-Fab-Menu]] |
| fab | Pass | [[Audit-Fab]] |
| snackbar | Pass | [[Audit-Snackbar]] |
| speed-dial | Pass | [[Audit-Speed-Dial]] |
| split-button | Pass | [[Audit-Split-Button]] |
| toolbar | Pass | [[Audit-Toolbar]] |
| attachment | Pass | [[Audit-Attachment]] |
| breadcrumb | Pass | [[Audit-Breadcrumb]] |
| date-picker | Pass | [[Audit-Date-Picker]] |
| field | Pass | [[Audit-Field]] |
| input-otp | Pass | [[Audit-Input-OTP]] |
| item | Pass | [[Audit-Item]] |
| native-select | Pass | [[Audit-Native-Select]] |
| questionnaire | Pass | [[Audit-Questionnaire]] |
| resizable | Pass | [[Audit-Resizable]] |
| spinner | Pass | [[Audit-Spinner]] |
| toast | Pass | [[Audit-Toast]] |
| typography | Pass | [[Audit-Typography]] |
| area-chart | Pass | [[Audit-Area-Chart]] |
| chart | Pass | [[Audit-Chart]] |

## Context
- Related: [[Media-Utilities]] [[Collection-Display]] [[Input-Controls]] [[Shadcn-gaps]] [[Area-charts]] [[Internal-Progress]]
- Implementation Path: `apps/www/content/docs/components`
- Principles used when they shaped a finding: Experience First, Prove It Works, Fix Root Causes, Laziness Protocol, Minimize Reader Load, Model the Domain.
