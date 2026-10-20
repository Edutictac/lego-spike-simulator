<script lang="ts">
    import { t } from '$lib/i18n';
    import { Button, Modal } from 'flowbite-svelte';

    export let modalOpen = false;
    export let callback: (colour: boolean) => void;

    function cancel() {
        modalOpen = false;
    }

    function printColour() {
        modalOpen = false;
        callback(true);
    }

    function printBW() {
        modalOpen = false;
        callback(false);
    }
</script>

<Modal
    backdropClass="fixed inset-0 z-[80] bg-gray-900 bg-opacity-50 dark:bg-opacity-80"
    dialogClass="fixed top-0 start-0 end-0 h-modal md:inset-0 md:h-full z-[90] w-full p-4 flex"
    title={t('Print code')}
    bind:open={modalOpen}
>
    <div class="flex flex-col gap-2 items-center">
        <Button class="w-96" on:click={printColour} color="light">{t('Colour')}</Button>
        <Button class="w-96" on:click={printBW} color="light">{t('Black and White')}</Button>
        <Button class="w-96" on:click={cancel}>{t('CANCEL')}</Button>
    </div>
</Modal>
