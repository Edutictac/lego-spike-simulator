<script lang="ts">
    import { lang, languages, setLang, t, type Lang } from '$lib/i18n';

    function onChange(event: Event) {
        const next = (event.target as HTMLSelectElement).value as Lang;
        if (next === lang) return;
        if (
            confirm(
                t(
                    'Changing the language reloads the simulator and unsaved code will be lost. Continue?'
                )
            )
        ) {
            setLang(next);
        } else {
            (event.target as HTMLSelectElement).value = lang;
        }
    }
</script>

<select
    aria-label={t('Language')}
    title={t('Language')}
    class="text-sm rounded border border-gray-300 bg-white py-1 pl-2 pr-8"
    value={lang}
    on:change={onChange}
>
    {#each languages as option}
        <option value={option.code}>{option.name}</option>
    {/each}
</select>
