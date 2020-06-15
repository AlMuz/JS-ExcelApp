import { Page } from "@core/Page";
import { $ } from '@core/DOM'

export class DashboardPage extends Page {
    getRoot() {
        return $.create('div', 'db').html(`
            <div class="dashboard">
                <div class="dashboard__header">
                    <h1>Excell application dashboard</h1>
                </div>
                <div class="dashboard__new">
                    <div class="dashboard__view">
                        <a href="#" class="dashboard__create">
                            New <br /> Table
                        </a>
                    </div>
                </div>
                <div class="dashboard__table dashboard__view">
                    <div class="dashboard__list-header">
                        <span>Title</span>
                        <span>Last open date</span>
                    </div>
                    <ul class="dashboard__list">
                        <li class="dashboard__record">
                            <a href="#">Some title</a>
                            <strong>12.12.2021</strong>
                        </li>
                        <li class="dashboard__record">
                            <a href="#">Some title</a>
                            <strong>12.12.2021</strong>
                        </li>
                    </ul>
                </div>
            </div>
        `)
    }
}