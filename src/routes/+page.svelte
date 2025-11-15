<script lang="ts">
	import Board from "$lib/components/Board.svelte";
</script>

<svelte:head>
	<title>ShardCraft - Match 3 Game</title>
</svelte:head>

<main>
	<Board />
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 100vh;
		padding: 20px;
		background-image: url("/assets/ui/back.png");
		background-size: 115%;
		background-position: top;
		background-repeat: repeat-y;
	}
</style>
