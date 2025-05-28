<script lang="ts">
  import IconCode from "@tabler/icons-svelte/icons/code";
  import IconSparkles from "@tabler/icons-svelte/icons/sparkles";
  import IconAlertTriangle from "@tabler/icons-svelte/icons/alert-triangle"
  import { generateContent, parse } from "./utils";


  let businessName = $state("");
  let projectName = $state("");
  let additionalContext = $state("");
  let studentDepartment = $state("");

  let isLoading = $state(false); 
  $inspect(isLoading);

  let response: Promise<string | undefined> = $state() as Promise<
    string | undefined
  >;

  function clear(){
    businessName = "";
    projectName = "";
    additionalContext = "";
    studentDepartment = "";
  }

  function onclick() {
    isLoading = true

    response = generateContent(
      JSON.stringify({
        businessName,
        projectName,
        additionalContext,
        studentDepartment,
      }),
    );
    setTimeout(() => {isLoading = false}, 2000)
  }

  function validate() {
    return Boolean(businessName) && Boolean(projectName) && Boolean(additionalContext) && Boolean(studentDepartment)
  }
</script>

{#snippet breaks(length: number)}
  {#each { length }}
    <br />
  {/each}
{/snippet}

<section class="hero">
  <div class="hero-body">
    <div class="columns is-centered">
      <div class="column is-5-desktop is-9-tablet">
        <!--* First Section: About the product -->
        <div class="content">
          <h1 id="text">LogScribe AI</h1>
          <p>
            LogScribe AI is designed to assist you with your logbook reporting
            during your internship. It helps you generate daily entries based on
            your project and tasks, making the process faster and more
            efficient.
          </p>
          <a class="button is-small is-link is-ghost" href="https://github.com/Ezek-iel/LogScribeAI" target="_blank"
            ><span class="icon is-small"><IconCode /></span> <span class="icon-text">Github</span></a
          >
        </div>

        {@render breaks(1)}

        <!--* Second section: User input-->
        <div class="box p-5">
          <div class="notification has-background-warning-90 is-flex is-align-items-center is-gap-2">
            <IconAlertTriangle class="has-text-warning-30"/>
            <p class="has-text-warning-20">AI may be wrong and has errors. To improve accuracy, provide more context</p>
          </div>
          <div class="columns is-multiline">
            <div class="column is-9">
              <label for="businessName" class="help">Business name</label>
              <input
                type="text"
                class="input"
                id="businessName"
                placeholder="Business name"
                bind:value={businessName}
              />
            </div>
            <div class="column is-9">
              <label for="projectName" class="help">Project name</label>
              <input
                type="text"
                class="input"
                id="projectName"
                placeholder="Project name"
                bind:value={projectName}
              />
            </div>
            <div class="column is-9">
              <label for="studentDepartment" class="help"
                >Student department</label
              >
              <input
                type="text"
                class="input"
                id="studentDepartment"
                placeholder="Student department"
                bind:value={studentDepartment}
              />
            </div>
            <div class="column is-9">
              <label for="projectName" class="help">Additional context</label>
              <textarea
                name=""
                id=""
                class="textarea"
                placeholder="Additional context e.g What is the business all about, the week of the project, etc."
                bind:value={additionalContext}
              ></textarea>
            </div>
          </div>
          <div class="buttons">
            <button class="button is-primary {isLoading ? "is-loading" : ""}" {onclick}
              disabled={isLoading || !validate()}><span>Generate</span>
              <span class="icon is-small"><IconSparkles /></span></button
            >
            <button class="button" onclick={clear}>Clear</button>
          </div>
        </div>

        {@render breaks(2)}
        <!--* Third section: Response  -->
        <div class="box p-6">
          {#await response}
            {#each [1, 2, 3, 4, 5] as i}
              <div class="content">
                <h4>Day {i}</h4>
                <p class="skeleton-block">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
                  veniam ratione ad eos dolorem vitae, iure excepturi dolores
                  culpa non!
                </p>
              </div>

              {#if i != 5}
                <hr />
              {/if}
            {/each}
          {:then data}
            {#if data}
              {@const entries = JSON.parse(data)["entries"]}.
              {#each entries as entry, index (index)}
                <div class="content">
                  <h4> Day {index + 1} </h4>
                  <p>{@html parse(entry.activities)}</p>
                </div>

                 {#if index + 1 != 5}
                <hr />
              {/if}
                {/each}
            {/if}
          {:catch error}
          <div class="notification is-danger">
              <p>An error occurred: {error}</p>
          </div>
          {/await}
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  #text {
    color: transparent;
    background: linear-gradient(to right in oklch, hotpink, purple);
    background-clip: text;
  }
</style>
