class RenameColumns < ActiveRecord::Migration[7.0]
  def change
    rename_column :components, :type, :group

    rename_column :dependencies, :type, :group

  end
end
