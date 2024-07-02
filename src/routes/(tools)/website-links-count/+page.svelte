<script lang="ts">
	import { Input, ButtonGroup, Label, Textarea, Helper, Button, Card, Hr } from 'flowbite-svelte';

	let url = '';
    let links = [];
    let error = '';

    async function fetchLinks() {
        try {
            const response = await fetch(`http://localhost:3000/fetch-links?url=${encodeURIComponent(url)}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            links = await response.json();
            error = "";
        } catch (err) {
            error = `Error: ${err.message}`;
        }
    }
</script>

<div class="card gap-16 items-center mx-auto max-w-screen-xl overflow-hidden rounded-lg">
	<div class="p-8">

		<Label for="input-addon" class="mb-2">Enter URL</Label>
		<ButtonGroup class="w-full">
			<Input id="input-addon" type="url" placeholder="https://example.com/" bind:value={url}/>
			<Button color="primary" on:click={fetchLinks}>Search</Button>
		</ButtonGroup>		
		
		{#if links.length > 0}			
			<div class="card gap-16 items-center mx-auto max-w-screen-xl overflow-hidden rounded-lg p-8 mt-6">
				<h1 class="bold">Result</h1>
				<Hr classHr="my-0 h-0.5" />
				{#if error}
					<p style="color: red">{error}</p>
				{/if}
				<ul>
					{#each links as link}
						<li>
							<a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
						</li>
					{/each}
				</ul>
			</div>	
		{/if}

	</div>
</div>
