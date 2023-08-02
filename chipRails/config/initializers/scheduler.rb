require 'rufus-scheduler'

scheduler = Rufus::Scheduler.singleton

scheduler.every '24h' do
    VulnerabilityChecker.check_vulns
end
  
