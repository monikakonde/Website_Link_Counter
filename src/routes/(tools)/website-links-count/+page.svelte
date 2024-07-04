<script lang="ts">
	import { Input, ButtonGroup, Label, Button, CloseButton } from 'flowbite-svelte';
	import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';

	let url = '';
	let links = [];
	let error = '';

	// Variables to store link statistics
	let totalLinks = 0;
	let noFollowLinks = 0;
	let doFollowLinks = 0;
	let internalLinks = 0;
	let externalLinks = 0;

	async function fetchLinks() {
		try {
			const response = await fetch(`http://localhost:3000/fetch-links?url=${encodeURIComponent(url)}`);
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			links = await response.json();
			error = '';

			// Update link statistics
			totalLinks = links.length;
			noFollowLinks = links.filter(link => link.followStatus === 'No follow').length;
			doFollowLinks = links.filter(link => link.followStatus === 'Do follow').length;
			internalLinks = links.filter(link => link.isInternal === 'Yes').length;
			externalLinks = links.filter(link => link.isInternal === 'No').length;
		} catch (err) {
			error = `Error: ${err.message}`;
		}
	}

	function clearData() {
		url = '';
		links = [];
		error = '';
		// Reset link statistics
		totalLinks = 0;
		noFollowLinks = 0;
		doFollowLinks = 0;
		internalLinks = 0;
		externalLinks = 0;
	}
</script>

<div class="card gap-16 items-center mx-auto max-w-screen-xl overflow-hidden rounded-lg">
	<div class="p-8">
		<Label for="input-addon" class="mb-2">Enter URL</Label>
		<ButtonGroup class="w-full">
			{#if url === "" && links.length === 0}
				<Input id="input-addon" type="url" placeholder="https://example.com/" bind:value={url}/>
			{:else}
				<Input id="input-addon" type="url" placeholder="https://example.com/" bind:value={url}>
					<CloseButton slot="right" on:click={clearData} />
				</Input>
			{/if}
			<Button color="primary" on:click={fetchLinks}>Search</Button>
		</ButtonGroup>

		{#if error.length > 0}
			<p style="color: red" class="mt-4">{error}</p>
		{:else if links.length > 0}
			<div class="card w-80 overflow-hidden rounded-lg mt-8">
				<Table>
					<TableBody tableBodyClass="divide-y">
						<TableBodyRow>
							<TableBodyCell class="font-bold">Total Links:</TableBodyCell>
							<TableBodyCell class="">{totalLinks}</TableBodyCell>
						</TableBodyRow>
						<TableBodyRow>
							<TableBodyCell class="font-bold">Do Follow Links:</TableBodyCell>
							<TableBodyCell class="">{doFollowLinks}</TableBodyCell>
						</TableBodyRow>
						<TableBodyRow>
							<TableBodyCell class="font-bold">No Follow Links:</TableBodyCell>
							<TableBodyCell class="">{noFollowLinks}</TableBodyCell>
						</TableBodyRow>
						<TableBodyRow>
							<TableBodyCell class="font-bold">Internal Links:</TableBodyCell>
							<TableBodyCell class="">{internalLinks}</TableBodyCell>
						</TableBodyRow>
						<TableBodyRow>
							<TableBodyCell class="font-bold">External Links:</TableBodyCell>
							<TableBodyCell class="">{externalLinks}</TableBodyCell>
						</TableBodyRow>
					</TableBody>
				</Table>
			</div>
			
			<div class="card gap-16 items-center mx-auto max-w-screen-xl rounded-lg mt-8 overflow-hidden">
				<div class="block max-h-[400px] overflow-auto">
				<Table>
					<TableHead>
						<TableHeadCell class="!p-4">#</TableHeadCell>
						<TableHeadCell>Link</TableHeadCell>						
						<TableHeadCell>Anchor Text</TableHeadCell>
						<TableHeadCell>Type</TableHeadCell>
						<TableHeadCell>Follow</TableHeadCell>
						<TableHeadCell>Internal</TableHeadCell>
					</TableHead>
					<TableBody tableBodyClass="divide-y">
						{#each links as { href, text, type, followStatus, isInternal }, index}
							<TableBodyRow>
								<TableBodyCell class="!p-4">{index + 1}</TableBodyCell>
								<TableBodyCell>
									<a href={href} target="_blank" rel="noopener noreferrer">{href.slice(0, 40)}</a>
								</TableBodyCell>
								<TableBodyCell>{text.slice(0, 40)}</TableBodyCell>
								<TableBodyCell>{type}</TableBodyCell>
								<TableBodyCell>{followStatus}</TableBodyCell>
								<TableBodyCell>{isInternal}</TableBodyCell>
							</TableBodyRow>
						{/each}
					</TableBody>
				</Table>
				</div>
			</div>
		{/if}
	</div>
</div>
