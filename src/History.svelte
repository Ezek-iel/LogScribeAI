<script lang="ts">
    import Icon from "@iconify/svelte";
    import { fade } from "svelte/transition";
    import { getHistory } from "./utils";
    import Modal from "./Modal.svelte";

    let isVisible = $state(false);

    let history = $state(getHistory());

    function open() {
        isVisible = !isVisible;
        history = getHistory();
    }

    let modalActive = $state(false);
    let historyEntryIndex = $state(0);

    function openEntry(index: number) {
        console.log("Opening entry at index:", index);
        historyEntryIndex = index;
        modalActive = true;
    }
</script>

<Modal bind:active={modalActive} bind:entry={historyEntryIndex} />

<div style:position="relative">
    <button class="button" onclick={open}>
        <span class="icon is-small">
            <Icon icon="tabler:history" class="is-size-1" />
        </span>
    </button>

    {#key isVisible}
        {#if isVisible}
            <div id="floating-dialog" class="box" in:fade>
                <h3 class="title is-5">History</h3>
                <ul>
                    {#each history as entry, index (index)}
                        <div class="content mb-3">
                            <p>
                                <span class="has-text-weight-bold is-size-6"
                                    >{entry.businessName}</span
                                >
                                <br />
                                <span>{entry.projectName}</span>
                                <br />
                                <span class="has-text-grey"
                                    >{entry.studentDepartment}</span
                                >
                                <br />
                                <button
                                    class="button is-small mt-2"
                                    onclick={() => openEntry(index)}
                                    >View Response</button
                                >
                            </p>
                        </div>
                        {#if index < history.length - 1}
                            <hr />
                        {/if}
                    {/each}
                </ul>
            </div>
        {/if}
    {/key}
</div>

<style>
    #floating-dialog {
        position: absolute;
        inset: 0;
        top: 2.5rem;
        width: 300px;
        left: -16rem;
        height: fit-content;
        z-index: 1000;
        background-color: white;
    }

    @media (min-width: 1440px) {
        #floating-dialog {
            width: 400px;
            left: -22rem;
        }
    }
</style>
