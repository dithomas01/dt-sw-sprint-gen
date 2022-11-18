<script lang="ts">
    import { SprintNameService } from '@services/sprint-name.service';

    let title: string = 'Generate sprint name';
    let className: string = '';

    function generateSprintName(): void {
        SprintNameService.generateSprintName();
    }
</script>

<style src="./generator.component.scss"></style>

<div class="background">
    <div class="container">
        <button on:click={generateSprintName} class="button">New sprint</button>
        <h1 class="title {className}">{title}</h1>
    </div>
</div>