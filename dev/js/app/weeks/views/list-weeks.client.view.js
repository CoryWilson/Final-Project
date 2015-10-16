<div data-ng-controller="WeeksController" data-ng-init="findUser()">
  <section data-ng-init="find()">
		<div class="container">
			<h1>Weeks</h1>
            Show completed: <input type="checkbox" ng-model="showcompleted" ng-init="showcompleted=true">
			<ul>
				<li data-ng-repeat="week in weeks" ng-if="showcompleted && week.completed || !week.completed">
					<a data-ng-href="#!/commissioner/weeks/{{week.weekNum}}" data-ng-bind="week.weekNum" ng-class="week.completed?'completed':''"></a>
					(<small data-ng-bind="week.created"></small>)
				</li>
			</ul>
			<div data-ng-hide="!weeks || weeks.length">
				No weeks yet, why don't you <a href="/#!/commissioner/weeks/create">Create a Week</a>?
			</div>
		</div>
	</section>
</div>
