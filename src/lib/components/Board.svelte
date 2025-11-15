<script lang="ts">
	import { game } from "$lib/stores/game";
	import Gem from "./Gem.svelte";

	const handleGemClick = (row: number, col: number) => {
		game.selectGem({ row, col });
	};

	const isSelected = (row: number, col: number): boolean => {
		const selected = $game.selectedPosition;
		if (!selected) {
			return false;
		}
		return selected.row === row && selected.col === col;
	};
</script>

<div class="board">
	{#each $game.board.gems as row, rowIndex (rowIndex)}
		<div class="row">
			{#each row as gem, colIndex (gem.id)}
				<Gem
					{gem}
					selected={isSelected(rowIndex, colIndex)}
					onclick={() => handleGemClick(rowIndex, colIndex)}
				/>
			{/each}
		</div>
	{/each}
</div>

<style>
	.board {
		display: inline-block;
		padding: 20px;
		background-position: -4px -4px;
		background-size: 330px 250px;
		image-rendering: pixelated;
		position: relative;
	}

	.row {
		display: flex;
		gap: 4px;
		margin-bottom: 4px;
		position: relative;
		z-index: 1;
	}

	.row:last-child {
		margin-bottom: 0;
	}
</style>
