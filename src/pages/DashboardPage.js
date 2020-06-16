import { Page } from "@core/Page";
import { $ } from '@core/DOM'
import { createRecordsTable } from "./dashboard.functions";

export class DashboardPage extends Page {
    getRoot() {
        const now = Date.now().toString()
        return $.create('div', 'db').html(`
            <div class="dashboard">
                <div class="dashboard__header">
                    <h1>Excell application dashboard</h1>
                </div>
                <div class="dashboard__new">
                    <div class="dashboard__view">
                        <a href="#excel/${now}" class="dashboard__create">
                            New <br /> Table
                        </a>
                    </div>
                </div>
                <div class="dashboard__table dashboard__view">
                    ${ createRecordsTable() }
                </div>
            </div>
        `)
    }
}