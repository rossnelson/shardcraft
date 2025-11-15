<script lang="ts">
  import { game } from '$lib/stores/game';
</script>

<div class="score-display">
  <div class="panel">
    <div class="stat">
      <span class="label">Score</span>
      <span class="value">{$game.score.toLocaleString()}</span>
    </div>
  </div>
  <div class="panel">
    <div class="stat">
      <span class="label">Moves</span>
      <span class="value">{$game.moves}</span>
    </div>
  </div>
</div>

<style>
  .score-display {
    display: flex;
    gap: 16px;
    margin-bottom: 16px;
  }

  .panel {
    position: relative;
    background-image: url('/assets/ui/UI_Normal.png');
    background-position: -248px -140px;
    background-size: 440px 300px;
    image-rendering: pixelated;
    width: 128px;
    height: 96px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 8px;
  }

  .label {
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #8b6914;
    font-weight: bold;
    text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.3);
  }

  .value {
    font-size: 20px;
    font-weight: bold;
    color: #ffd700;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  }
</style>
