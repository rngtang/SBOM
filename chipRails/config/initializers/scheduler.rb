require 'rufus-scheduler'

scheduler = Rufus::Scheduler.singleton

scheduler.every '24hr' do
    VulnerabilityChecker.check_vulns
end
  
