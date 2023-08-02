require 'rufus-scheduler'

scheduler = Rufus::Scheduler.singleton

scheduler.every '5m' do
    VulnerabilityChecker.check_vulns
end
  
