# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

# Creating some users
puts 'seeding'

# Creates two users
user1 = User.create(netid: 'netid1', email: 'netid1@duke.edu')
user2 = User.create(netid: 'netid2', email: 'netid2@duke.edu')

# Creates sboms associated and not associated to a user
sbom1 = Sbom.create(bomFormat: 'CycloneDX', specVersion: '1.4', serialNumber: 'serial number 1', version: 1, name: 'sbom 1', description: 'description sbom1', archive: true)
sbom2 = Sbom.create(bomFormat: 'CycloneDX', specVersion: '1.4', serialNumber: 'serial number 2', version: 1, name: 'sbom 2', description: 'description sbom2', archive: true)
sbom3 = user1.sboms.create(bomFormat: 'CycloneDX', specVersion: '1.4', serialNumber: 'serial number 3', version: 1, name: 'sbom 3', description: 'description sbom3', archive: true)
sbom4 = user2.sboms.create(bomFormat: 'CycloneDX', specVersion: '1.4', serialNumber: 'serial number 4', version: 1, name: 'sbom 4', description: 'description sbom4', archive: true)

# Creates some metadata associated with the sboms
metadatum1 = sbom1.metadata.create(timestamp: '2023-06-22 7:22:00')
metadatum2 = sbom2.metadata.create(timestamp: '2023-06-22 7:22:00')

# Creates some sbomComponents associated with the sboms
sbomComponent1 = sbom1.sbom_components.create(bom_ref: 'reference depency 1', group: 'library', name: 'sbomComponent NAME 1', version: '1.1', purl: 'eiwghjewoijg')
sbomComponent2 = sbom2.sbom_components.create(bom_ref: 'reference depency 1', group: 'library', name: 'sbomComponent NAME 2', version: '1.1', purl: 'eiwghjewoijg')

# Creates tools associated to metadata
tool1 = metadatum1.tools.create(vendor: 'meta', name: 'cyclonedx', version: '2.3.4')
tool1 = metadatum2.tools.create(vendor: 'Google', name: 'cyclonedx', version: '2.3.4')

# Creates properties associated to sbomComponents
property1 = sbomComponent1.properties.create(name: 'kk', value: '234')
property2 = sbomComponent2.properties.create(name: 'll', value: '432')

# Creates dependencies
dependency1 = sbom1.dependencies.create(ref: 'sdgewpjgweig', dependsOn: ['first element', 'second element'])
dependency2 = sbom2.dependencies.create(ref: 'pjipip[kl[]]', dependsOn: ['first element', 'second element'])

# Creates vulnerabilities
vuln1 = sbom1.vulnerabilities.create(bom_ref: 'sdsdgsdf', vulnID: 'sdfsdgsd', description: 'egeg', recommendation: 'wegewg', affected: ['first element', 'second element'])
vuln2 = sbom2.vulnerabilities.create(bom_ref: 'sdsdgsdf', vulnID: 'sdfsdgsd', description: 'egeg', recommendation: 'wegewg', affected: ['first element', 'second element'])

# Creates ratings
rating1 = vuln1.ratings.create(score: 4.5, severity: 'high')
rating2 = vuln2.ratings.create(score: 1, severity: 'low')

# Creates sources
source1 = vuln1.sources.create(name: 'google', url: 'fdasdfds.com')
source2 = vuln2.sources.create(name: 'baidu', url: 'kopok.com')

puts 'seed complete'