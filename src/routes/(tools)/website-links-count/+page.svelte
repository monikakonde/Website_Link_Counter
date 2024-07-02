<script lang="ts">
	import { Input, ButtonGroup, Label, Button, Hr } from 'flowbite-svelte';
	import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';

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
			error = '';
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

		{#if error.length > 0}
			<p style="color: red" class="mt-4">{error}</p>
		{:else if links.length > 0}
			<div class="card gap-16 items-center mx-auto max-w-screen-xl overflow-hidden rounded-lg mt-8">
				<Table>
					<TableHead>
						<TableHeadCell class="!p-4">#</TableHeadCell>
						<TableHeadCell>Link</TableHeadCell>						
						<TableHeadCell>Anchor Text</TableHeadCell>
						<TableHeadCell>Type</TableHeadCell>
						<TableHeadCell>Follow</TableHeadCell>
					</TableHead>
					<TableBody tableBodyClass="divide-y">
						{#each links as { href, text, type, followStatus }, index}
							<TableBodyRow>
								<TableBodyCell class="!p-4">{index + 1}</TableBodyCell>
								<TableBodyCell>
									<a href={href} target="_blank" rel="noopener noreferrer">{href}</a>
								</TableBodyCell>
								<TableBodyCell>{text}</TableBodyCell>
								<TableBodyCell>{type}</TableBodyCell>
								<TableBodyCell>{followStatus}</TableBodyCell>
							</TableBodyRow>
						{/each}
					</TableBody>
				</Table>
			</div>
		{/if}
	</div>
</div>
