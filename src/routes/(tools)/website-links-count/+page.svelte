<script lang="ts">
	import { Input, ButtonGroup, Label, Textarea, Helper, Button } from 'flowbite-svelte';
	export let data;

	var url;
	var result;
</script>


<div class="card gap-16 items-center mx-auto max-w-screen-xl overflow-hidden rounded-lg">
	<div class="p-8">

		<Label for="input-addon" class="mb-2">Enter URL</Label>
		<ButtonGroup class="w-full">
			<Input id="input-addon" type="url" placeholder="https://example.com/" bind:value={url}/>
			<Button color="primary">Search</Button>
		</ButtonGroup>

		<Label for="textarea-id" class="mt-4 mb-2">Result</Label>
		<Textarea id="textarea-id" placeholder="List of links will appear here" rows="4" bind:value={result}/>

	</div>
</div>


