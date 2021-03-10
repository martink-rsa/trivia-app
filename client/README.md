### Notes and To-Dos:

- Sass/SCSS has support been added with `node-sass`. Remove this if SASS/SCSS is not being used.
- The Answer component is currently using conditional values in the styled-components. This component is meant to get reworked to include an animation I have in mind. When this takes place, it should use native CSS to handle the selection option instead of the conditional values it currently uses. The current method leads to classes switching in and out which is most likely not as efficient as having it styled by native CSS.