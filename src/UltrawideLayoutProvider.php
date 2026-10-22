<?php

namespace UltrawideLayout;

use Pterodactyl\Extensions\ExtensionProvider;
use Pterodactyl\Services\Extensions\ExtensionSettingDefinition;
use Pterodactyl\Services\Extensions\ExtensionSettingsDefinition;

class UltrawideLayoutProvider extends ExtensionProvider
{
    public function boot(): void
    {
        // Every value reaches the frontend bundle as ctx.config, which writes it into a CSS variable
        // on <html>. Sizes are in rem. Signed-out pages (the login screen) use the stylesheet's defaults.
        $this->registerSettings(new ExtensionSettingsDefinition($this->settings(), [
            ExtensionSettingDefinition::make('edge', 'edge', 3, ['numeric', 'min:0', 'max:8'])
                ->field('number')
                ->label('Edge spacing (rem)')
                ->help('The most space kept between content and the edge of the screen. It scales down to 1rem on narrow screens.')
                ->frontend()
                ->frontendType('number'),
            ExtensionSettingDefinition::make('max_width', 'max_width', 0, ['numeric', 'min:0', 'max:1000'])
                ->field('number')
                ->label('Maximum content width (rem)')
                ->help('0 spans the whole window. 75 is the panel\'s stock width; 160 is about 2560px.')
                ->frontend()
                ->frontendType('number'),
            ExtensionSettingDefinition::make('console_layout', 'console_layout', true, ['boolean'])
                ->field('toggle')
                ->label('Reflow the console on wide screens')
                ->help('From 2200px wide, give the power buttons and stat tiles a fixed column and the console the rest.')
                ->frontend()
                ->frontendType('boolean'),
            ExtensionSettingDefinition::make('console_aside', 'console_aside', 24, ['numeric', 'min:14', 'max:48'])
                ->field('number')
                ->label('Console side column (rem)')
                ->help('Width of the power buttons and stat tiles beside the console when it is reflowed.')
                ->frontend()
                ->frontendType('number'),
            ExtensionSettingDefinition::make('console_height', 'console_height', 60, ['numeric', 'min:16', 'max:200'])
                ->field('number')
                ->label('Tallest console (rem)')
                ->help('On screens at least 900px tall the console grows with the window up to this height. 16 keeps the stock height.')
                ->frontend()
                ->frontendType('number'),
        ]));
    }
}
