# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

# Creating some users
puts 'seeding'

user1 = User.create(username: 'user1')
user2 = User.create(username: 'user2')

# Creating some sboms associated with the users
sbom1 = user1.sboms.create(bomFormat: 'CycloneDX', specVersion: '1.4', serialNumber: 'serial number 1', version: 1, name: 'sbom 1', description: 'description sbom1') #we could add more fields to match all the attributes of sboms
sbom2 = user2.sboms.create(bomFormat: 'CycloneDX', specVersion: '1.4', serialNumber: 'serial number 2', version: 1, name: 'sbom 2', description: 'description sbom2')

# Creating some metadata associated with the sboms
metadatum1 = sbom1.metadata.create(timestamp: '2023-06-22 7:22:00')
metadatum2 = sbom2.metadata.create(timestamp: '2023-06-22 7:22:00')

# Creating some dependencies associated with the sboms
dependency1 = sbom1.dependencies.create(bom_ref: 'reference depency 1', group: 'library', publisher: 'Duke', name: 'DEPENDENCY NAME 1', version: '1.1', cpe: 'jeoigfjeogi', purl: 'eiwghjewoijg')
dependency2 = sbom2.dependencies.create(bom_ref: 'reference depency 1', group: 'library', publisher: 'Duke', name: 'DEPENDENCY NAME 2', version: '1.1', cpe: 'jeoigfjeogi', purl: 'eiwghjewoijg')

# some tools
tool1 = Tool.create(vendor: 'meta', name: 'cyclonedx', version: '2.3.4', metadatum: metadatum1)
tool1 = metadatum2.tools.create(vendor: 'Google', name: 'cyclonedx', version: '2.3.4')

# some components
component1 = metadatum1.components.create(group: 'software', name:'Duke', version: '1.2.2', metadatum: metadatum1)
component2 = metadatum2.components.create(group: 'software', name:'Unc', version: '1.2.3', metadatum: metadatum2)

# license
license1 = License.create(iden: 'uncdown145', dependency: dependency1)
license2 = License.create(iden: 'dukeup176', dependency: dependency2)

# sub_component
sub_component1 = SubComponent.create(bom_ref: 'bom ref 1', group: 'library', publisher: 'Sbom team', name: 'name component', version: '2', cpe: 'erg3rehg', purl: 'kerpghkoern', dependency: dependency1)
sub_component2 = SubComponent.create(bom_ref: 'bom ref 2', group: 'os', publisher: 'Sbom team', name: 'name component 2', version: '435', cpe: 'ulidsfg', purl: 'hgjetjt', dependency: dependency2)

# property
property1 = Property.create(name: 'kk', value: '234', dependency: dependency1)
property2 = Property.create(name: 'll', value: '432', dependency: dependency2)

<<<<<<< HEAD
=======
# external reference
externalReference1 = ExternalReference.create(group: 'ejowe', url: 'gregrhrehreher.com', dependency: dependency1)
externalReference2 = ExternalReference.create(group: 'kppihup', url: 'externalReference2.com', dependency: dependency2)

# child
child1 = Child.create(ref: 'sdgewpjgweig', dependsOn: ['first element', 'second element'], sbom: sbom1)
child2 = Child.create(ref: 'pjipip[kl[]]', dependsOn: ['first element', 'second element'], sbom: sbom2)

# vulnerability
vuln1 = Vulnerability.create(bom_ref: 'sdsdgsdf', vulnID: 'sdfsdgsd', description: 'egeg', detail: 'wgrer', recommendation: 'wegewg', created: 'sadf', published: 'sadfdsfd', updated: 'asdfsf', affected: ['first element', 'second element'], sbom: sbom1)
vuln2 = Vulnerability.create(bom_ref: 'sdsdgsdf', vulnID: 'sdfsdgsd', description: 'egeg', detail: 'wgrer', recommendation: 'wegewg', created: 'sadf', published: 'sadfdsfd', updated: 'asdfsf', sbom: sbom2)

# ratings
rating1 = Rating.create(score: 4.5, severity: 'high', vulnerability: vuln1)
rating2 = Rating.create(score: 1, severity: 'low', vulnerability: vuln2)

# source
source1 = Source.create(name: 'google', url: 'fdasdfds.com', rating: rating1)
source2 = Source.create(name: 'baidu', url: 'kopok.com', rating: rating2)

>>>>>>> 10-expandDatabase
puts 'seed complete'