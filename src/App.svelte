<script lang="ts">
  import IconCode from "@tabler/icons-svelte/icons/code";
  import IconSparkles from "@tabler/icons-svelte/icons/sparkles";
</script>


{#snippet breaks(length: number)}
  {#each {length}}
    <br>
  {/each}
{/snippet}

<section class="hero">
  <div class="hero-body">
    <div class="columns is-centered">
      <div class="column is-7">

        <!--* First Section: About the product -->
        <div class="content">
          <h1 id="text">LogScribe AI</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur quas quae debitis eos quibusdam eaque veritatis dignissimos doloremque laudantium natus!
          </p>
          <button class="button is-small is-link is-ghost"><span class="icon is-small"><IconCode /></span></button>
        </div>

        {@render breaks(1)}

        <!--* Second section: User input-->
        <div class="box p-5">
            <div class="columns is-multiline">
              <div class="column is-11">
                <label for="businessName" class='help'>Business name</label>
                <input type="text" class="input" id='businessName' placeholder="Business name">
              </div>
              <div class="column is-11">
                <label for="projectName" class='help'>Project name</label>
                <input type="text" class="input" id='projectName' placeholder="Project name">
              </div>
              <div class="column is-11">
                <label for="projectName" class='help'>Additional context</label>
                <textarea name="" id="" class="textarea" placeholder="Additional context"></textarea>
              </div>
            </div>
            <div class="buttons">
              <button class="button is-primary"><span>Generate</span> <span class="icon is-small"><IconSparkles/></span></button>
              <button class="button">Clear</button>
            </div>
        </div>

        {@render breaks(2)}
        <!--* Third section: Response  -->
        <div class="box p-6">
            {#each [1,2,3,4,5] as i}
              <div class="content">
                <h4>Day {i}</h4>
                <p class="skeleton-block">Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio veniam ratione ad eos dolorem vitae, iure excepturi dolores culpa non!</p>
              </div>

              {#if i != 5}
              <hr>
              {/if}
            {/each}
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  * {
    font-family: "Hanken Grotesk";
  }

  #text {
    color: transparent;
    background: linear-gradient(to right in oklch, teal, darkorange);
    background-clip: text;
  }
</style>
