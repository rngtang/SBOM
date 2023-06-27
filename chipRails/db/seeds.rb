# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

# Creating some users
user1 = User.create!(username: 'user1', email: 'user1@duke.edu', netid: 'passwor4')
user2 = User.create!(username: 'user2', email: 'user2@duke.edu', netid: 'passwor6')

# Creating some sboms associated with the users
sbom1 = user1.sboms.create!(name: 'sbom1', description: 'This is an sbom for user1', user: user1) #we could add more fields to match all the attributes of sboms
sbom2 = user2.sboms.create!(name: 'sbom2', description: 'This is an sbom for user2', user: user2)

# Creating some metadata associated with the sboms
metadatum1 = sbom1.metadata.create!(timestamp: '2023-06-22 7:22:00', sbom: sbom1)
metadatum2 = sbom2.metadata.create!(timestamp: '2023-06-22 7:22:00', sbom: sbom2)

# Creating some dependencies associated with the sboms
dependency1 = sbom1.dependencies.create!(name: 'dependency1', version: '1.0.0', sbom: sbom1)
dependency2 = sbom2.dependencies.create!(name: 'dependency2', version: '2.0.0', sbom: sbom2)

#some tools
tool1 = metadatum1.tools.create!(vendor: 'meta', name: 'cyclonedx', version: '2.3.4', metadatum: metadatum1)
tool1 = metadatum2.tools.create!(vendor: 'Google', name: 'cyclonedx', version: '2.3.4', metadatum: metadatum2)

#some components
component1= metadatum1.components.create!(group: 'software', name:'Duke', version: '1.2.2', metadatum: metadatum1)
component2= metadatum2.components.create!(group: 'software', name:'Unc', version: '1.2.3', metadatum: metadatum2)

#license
license1= dependency1.licenses.create!(iden: 'uncdown145', dependency: dependency1)
license2= dependency2.licenses.create!(iden: 'dukeup176', dependency: dependency2)

#sub_component
sub_component1= dependency1.sub_components.create!(group: 'random', name: 'salesforce', dependency: dependency1)
sub_component2= dependency2.sub_components.create!(group: 'soccer', name: 'psg', dependency: dependency2)

#property)
property1=dependency1.properties.create!(name: 'kk', value: '234', dependency: dependency1)
property2=dependency2.properties.create!(name: 'll', value: '432', dependency: dependency2)