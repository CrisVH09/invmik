<?php

namespace Tests\Feature;

use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class BirthdayInvitationTest extends TestCase
{
    public function test_invitation_is_public_and_receives_event_configuration(): void
    {
        config(['birthday.date' => '2026-12-12T19:00:00-06:00', 'birthday.venue' => 'Test Arena']);

        $this->get(route('home'))->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('welcome')
                ->where('eventData.name', 'Angel')
                ->where('eventData.age', 18)
                ->where('eventData.playerNumber', 8)
                ->where('eventData.date', '2026-12-12T19:00:00-06:00')
                ->where('eventData.venue', 'Test Arena'));
    }

    public function test_social_metadata_is_present_without_javascript(): void
    {
        $this->get(route('home'))->assertOk()
            ->assertSee('Angel cumple 18 | Capy Basketball')
            ->assertSee('property="og:image"', false)
            ->assertSee('lang="es"', false);
    }
}
