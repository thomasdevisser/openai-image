/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from "@wordpress/block-editor";
import { TextControl, Button } from "@wordpress/components";
import { useState } from "@wordpress/element";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	let [prompt, setPrompt] = useState("");
	const { imageURL } = attributes;
	const AI_KEY = "";

	function generateImage(prompt) {
		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + AI_KEY,
			},
			body: JSON.stringify({
				prompt,
				size: "256x256",
				n: 1,
			}),
		};

		fetch("https://api.openai.com/v1/images/generations", options)
			.then((response) => response.json())
			.then((data) => setAttributes({ imageURL: data.data[0].url }));
	}

	return (
		<p {...useBlockProps()}>
			{imageURL && <img src={imageURL} />}
			<TextControl
				label="Prompt"
				value={prompt}
				onChange={(newPrompt) => setPrompt(newPrompt)}
			/>
			<Button variant="secondary" onClick={() => generateImage(prompt)}>
				Click me
			</Button>
		</p>
	);
}
