<script lang="ts">
    import { onMount } from 'svelte';
    import { SprintNameService } from '@services/sprint-name.service';

	onMount(() => {
       console.log(SprintNameService.generateSprintName());
    })
</script>

<svelte:options tag="dt-sprint-name-gen"/>

<div>Test</div>
