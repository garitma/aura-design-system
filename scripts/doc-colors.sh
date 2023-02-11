echo '### --aura-'$1'
Variable for '$1' color.

*:root {
	--aura-'$1': '$2'
}

Description
--aura-'$1' is a CSS custom property that specifies the background color for a design system. The value of --aura-'$1' is set to the color code '$2', which represents a '$1' color. This custom property can be used as the background color for various elements within the design system, helping to maintain consistency and make updates easier to manage. By using a CSS custom property, the background color can be easily changed and updated in one place, rather than having to update it across multiple CSS rules.

The CSS custom property --aura-'$1' can be used in a .'$1' class in HTML to set the background color of an element. In the CSS file, the .'$1' class can be defined as follows:

	.'$1' {
	  background-color: var(--aura-'$1');
	}

And in the HTML file, the class can be applied to an element like this:

	<div class="'$1'">
	  <!-- content goes here -->
	</div>

By using the .'$1' class, the background color of the element will be set to the value of the --aura-'$1' custom property, which is '$2'. This helps to maintain consistency and makes updates to the background color easier to manage.'