class CreateLicenses < ActiveRecord::Migration[7.0]
  def change
    create_table :licenses do |t|
      t.string :iden
      #t.belongs_to :dependency, foreign_key: true

      t.timestamps
    end
  end
end
