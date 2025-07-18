<script lang="ts">
    import { getHistoryEntry, parse } from "./utils";

    let {
        active = $bindable(false),
        entry = $bindable(0),
    }: { active: boolean; entry: number } = $props();

    let historyEntry = $state(getHistoryEntry(entry));
</script>

{#if historyEntry}
    <div class="modal {active ? 'is-active' : ''}" style:z-index="1001">
        <div class="modal-background"></div>
        <div class="modal-content">
            <div class="box">
                <div class="content">
                    <h3 class="title is-4">{historyEntry.businessName}</h3>
                    <p class="has-text-weight-bold">{historyEntry.projectName}</p>
                    <p>{historyEntry.studentDepartment}</p>
                    <p class="has-text-grey">
                        {historyEntry.additionalContext}
                    </p>
                    <hr />
                    <h4 class="subtitle is-6">Response</h4>

                    <ul>
                        {#each JSON.parse(historyEntry.response) as entry}
                            <li>{@html parse(entry)}</li>
                        {/each}
                    </ul>
                </div>
            </div>
        </div>
        <button
            class="modal-close is-large"
            aria-label="close"
            onclick={() => (active = false)}
        ></button>
    </div>
{/if}
