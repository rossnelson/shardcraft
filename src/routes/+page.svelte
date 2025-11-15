<script lang="ts">
	import GameMenu from "$lib/components/GameMenu.svelte";
	import ScoreDisplay from "$lib/components/ScoreDisplay.svelte";
	import Board from "$lib/components/Board.svelte";
	import { game } from "$lib/stores/game";
</script>

<svelte:head>
	<title>ShardCraft - Match 3 Game</title>
</svelte:head>

<main>
	<GameMenu />
	{#if $game.state === "playing"}
		<ScoreDisplay />
	{/if}
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
